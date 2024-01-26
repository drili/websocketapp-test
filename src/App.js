import React, { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:3001";

function App() {
	const [notifications, setNotifications] = useState([])
	const [message, setMessage] = useState("")

	
	const sendMessage = () => {
		const socket = socketIOClient(ENDPOINT);
        socket.emit('sendMessage', message);
	}

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT)

		socket.on("notification", (newMessage) => {
			const newMessageModified = `${socket.id} ${newMessage}`
			setNotifications((notifications) => [...notifications, newMessageModified])
		})

		return () => socket.disconnect()
	}, [])

	return (
		<div>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>

			<button onClick={sendMessage}>Send Message</button>

			<div>
				{notifications.map((notification, index) => (
					<div key={index}>
						{notification}
					</div>
				))}
			</div>
		</div>
	)
}

export default App;
