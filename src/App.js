import { useEffect, useState, useNavigate } from "react";
import "./App.css";
import SeatStatus from "./SeatStatus";
import Login from "./Login";
import AfterLogin from "./AfterLogin";
import FreeSeat from "./components/FreeSeat";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const statusapi = "http://localhost:8080/api/seats";

function App() {
	const [data, setData] = useState([]); // 좌석 정보 용 useState
	const [session, setSession] = useState([]); // session 저장용 useState
	const [isLogin, setIsLogin] = useState(false); // 로그인 여부 확인
	const [menuSelect, setMenuSelect] = useState("");

	// 로그인 성공시 세션 저장
	const handleLoginSession = (phonenumber, authnumber) => {
		const newSession = {
			phonenumber,
			authnumber,
		};
		setSession([newSession]);
	};

	// 잔여 좌석 계산용
	const getData = async () => {
		const res = await fetch(statusapi).then((res) => res.json());

		const initData = res.map((it) => {
			return {
				seat_id: it.seat_id,
				cur_seat_user: it.cur_seat_user,
			};
		});
		setData(initData);
	};

	const temp = (tmp) => {
		setMenuSelect(tmp);
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (session[0] == null) {
			// session에 값이 없다면
			console.log("로그인 실패 ");
		} else {
			// session에 phonenumber 가 있다면
			setIsLogin(true);
			console.log("로그인 성공 ");
		}
	});

	const logOut = () => {
		session.pop();
		setIsLogin(!isLogin);
	};

	return (
		<div className="outer">
			<div className="App">
				<div className="Logo-nav">
					<h1 style={ { fontFamily: 'Cafe24Ssurround', textAlign : 'left', marginLeft : '10px', marginBottom:'3px' , marginTop : '3px', height : '13%'} }>스터디 GO</h1>
            		<img className="cafeImage" alt="cafeImage" src="cafe.jpg"></img>
				</div>
				<SeatStatus
					seat_data={data}
					isLogin={isLogin}
					selectedMenu={menuSelect}
				/>
				{isLogin ? (
					<div>
						<AfterLogin logoutButton={logOut} handleMenuSelect={temp} />
					</div>
				) : (
					<Login handleLoginSession={handleLoginSession} />
				)}
				<div className="Explanation">
					<p style={ { whiteSpace: "pre-line", fontFamily: 'Cafe24Ssurround', textAlign : 'left', marginLeft : '10px', marginBottom:'3px' , marginTop : '3px', height : '13%'} }>유의사항<br></br>
						01 로그인하셔야 좌석선택이 가능합니다.<br></br>
						02 로그인시 휴대폰 인증은 필수입니다.<br></br>
						03 키오스크 이용 후엔 로그아웃 처리 바랍니다.
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;
