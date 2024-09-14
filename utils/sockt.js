export default class ReconnectingWebSocket {
	constructor(url, options = {}) {
		const defaultOptions = {
			maxRetries: 15,
			reconnectInterval: 5000,
			heartbeatInterval: 30000,
			messageHandler: null
		};

		const mergedOptions = {
			...defaultOptions,
			...options
		};

		this.url = url;
		this.maxRetries = mergedOptions.maxRetries;
		this.reconnectInterval = mergedOptions.reconnectInterval;
		this.heartbeatInterval = mergedOptions.heartbeatInterval;
		this.retries = 0;
		this.socket = null;
		this.heartbeatTimer = null;
		this.messageHandler = mergedOptions.messageHandler;
		this.connect();
	}

	connect() {
		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			console.log('WebSocket已连接');
			this.startHeartbeat();
			this.retries = 0;
		};

		this.socket.onmessage = (event) => {
			console.log('收到消息:', event.data);
			if (typeof this.messageHandler === 'function') {
				this.messageHandler(event.data);
			}
			// 如果收到了 "pong" 消息，则连接仍然活跃，重置重连次数
			if (event.data === 'pong') {
				this.retries = 0;
			}
		};

		this.socket.onclose = () => {
			console.log('WebSocket连接已断开');
			this.stopHeartbeat();
			if (this.retries < this.maxRetries) {
				console.log('尝试重新连接...');
				setTimeout(() => {
					this.retries++;
					this.connect(); // 重新连接
				}, this.reconnectInterval);
			} else {
				console.log('重连次数已达上限，连接已放弃.');
			}
		};

		this.socket.onerror = (error) => {
			console.error('WebSocket错误:', error);
		};
	}

	send(data) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(data);
		} else {
			console.error('WebSocket未打开，无法发送数据.');
		}
	}

	startHeartbeat() {
		this.heartbeatTimer = setInterval(() => {
			if (this.socket && this.socket.readyState === WebSocket.OPEN) {
				// 发送 "ping" 消息
				this.socket.send('ping');
			} else {
				// 连接已断开，尝试重新连接
				console.log('连接已断开，尝试重新连接...');
				this.reconnect();
			}
		}, this.heartbeatInterval);
	}

	stopHeartbeat() {
		clearInterval(this.heartbeatTimer);
	}

	reconnect() {
		if (this.socket && this.socket.readyState !== WebSocket.OPEN) {
			this.connect(); // 重新连接
		}
	}

	close() {
		if (this.socket) {
			this.socket.close();
		}
	}
}

// 使用示例
// const handleMessage = (message) => {
//   console.log('处理消息:', message);
// };

// const ws = new ReconnectingWebSocket(
//   'ws://example.com/socket',
//   {
//     maxRetries: 5,
//     reconnectInterval: 5000,
//     heartbeatInterval: 30000,
//     messageHandler: handleMessage
//   }
// );

// // 发送消息
// ws.send('你好，WebSocket！');