import { useState } from "react";
const SeatStatus = ({ seat_data }) => {
	const total_seats = Object.keys(seat_data).length;
	let users = 0;
	for (let i = 0; i < total_seats; i++) {
		if (seat_data[i].cur_seat_user != -10) {
			users += 1;
		}
	}

	return (
		<div className="SeatStatus">
			<div className="status-description">
				<pre style={ {fontFamily: 'Cafe24Ssurround', textAlign : 'center'} }>총 자리 수 : {total_seats}           사용중 : {users}</pre>
			</div>
		</div>
	);
};

export default SeatStatus;
