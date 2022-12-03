import { useEffect, useState } from "react";
import "./App.css";
import SeatStatus from "./SeatStatus";
import Login from "./Login";

const statusapi = "http://localhost:8080/api/seats";

function App() {
	const [data, setData] = useState([]); // 좌석 정보 용 useState
	const [session, setSession] = useState([]); // session 저장용 useState
	const [isLogin, setIsLogin] = useState(false); // 로그인 여부 확인

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

	return (
		<div className="outer">
			<div className="App">
				<div className="Logo-nav">
					<h1 style={ { fontFamily: 'Cafe24Ssurround', textAlign : 'left',marginLeft : '10px' } }>스터디 GO</h1>
            		<img className="cafeImage" alt="cafeImage" src="cafe.jpg"></img>
					<SeatStatus seat_data={data}></SeatStatus>
				</div>
				
				<Login handleLoginSession={handleLoginSession} />
			</div>
		</div>
	);
}

export default App;
