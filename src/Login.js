import { useState } from "react";
import axios from "axios";

const Login = ({ handleLoginSession }) => {
	const [phone, setPhone] = useState("");
	const [authnum, setAuthnum] = useState();

	// 전화번호 정규식
	const telReg_phoneNumber = /(010)([0-9]{4})([0-9]{4})$/;
	// 인증 번호 정규식
	const telReg_authNumber = /\d{4}/;

	// 인증 요청 핸들 함수
	const handleAuthNumRequest = () => {
		if (telReg_phoneNumber.test(phone)) {
			window.alert("인증 번호가 전송되었습니다.");

			// requestauthnum으로 전화번호를 보냄
			axios.post("http://localhost:8080/api/requestauthnum", {
				phonenumber: phone,
			});
		} else {
			window.alert("올바른 번호를 입력해주세요.");
			return;
		}
	};

	// 로그인 핸들 함수
	const handleLoginRequest = () => {
		// 조건 만족시
		if (telReg_phoneNumber.test(phone) && telReg_authNumber.test(authnum)) {
			console.log(authnum);
			axios // axios로 post로 전화 번호와 인증번호 보냄
				.post("http://localhost:8080/api/loginrequest", {
					phonenumber: phone,
					authnumber: authnum,
				})
				.then((res) => {
					if (res.data === "login-success") {
						window.alert("인증 성공!");
						handleLoginSession(phone, authnum); // 세션 저장
					} else if (res.data === "user-not-found") {
						window.alert("인증번호를 받아주세요");
					} else if (res.data === "Auth-number-not-match") {
						window.alert("인증번호가 틀렸습니다");
					} else {
						window.alert("Unknown Error");
					}
				});
		} else if (!telReg_phoneNumber.test(phone)) {
			window.alert("올바른 전화번호를 입력해주세요.");
		} else if (!telReg_authNumber.test(authnum)) {
			window.alert("올바른 형식의 인증번호를 입력해주세요.");
		}
	};

	return (
		<div className="LoginContainer">
			<div className="PhoneContainer">		
				<input
					name="phonenum"
					placeholder="휴대전화를 입력하세요"
					value={phone}
					onChange={(e) => {
						setPhone(e.target.value);
					}}
				></input>
				<button className ="auth-button" onClick={handleAuthNumRequest}>
					인증번호 받기
				</button>
				
			</div>
			<button className="login-button" onClick={handleLoginRequest}>
					로그인
			</button>
			<div className="AuthContainer">
				<input
					name="authnum"
					placeholder="인증번호를 입력하세요"
					value={authnum}
					onChange={(e) => {
						setAuthnum(e.target.value);
					}}
				></input>
			</div>
		</div>
	
	);
};

export default Login;
