import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { messaging, getToken, onMessage, analytics } from './firebase/firebase-messaging';
import { logEvent } from 'firebase/analytics';

function App() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState(null);

  // ✅ FCM 토큰 서버에 저장 요청 함수
  const saveTokenToServer = async (fcmToken) => {
    try {
      // fetch로 Browser Token 저장
      const response = await fetch('http://localhost:8080/spring/api/fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-USER-ID': '4',
        },
        body: JSON.stringify({
          token: fcmToken,
          platform: 'WEB',
        }),
      });
      
      if (response.ok) {
        console.log('✅ FCM 토큰이 서버에 저장되었습니다.');
      } else if (response.status === 400) {
        console.warn('⚠️ 이미 저장된 FCM 토큰입니다.');
      } else {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

    } catch (error) {
      console.error('❌ FCM 토큰 저장 실패:', error);
    }
  };

  useEffect(() => {
    // 서비스 워커 등록
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered');
          // 토큰 요청
          getToken(messaging, {
            vapidKey: 'BCVKNZqiol2VCRt2lbdh34n4jKuQjYwhETr0sbrw_COhQppGRwez6pBT_iv3o3LFYwkTJgmX-kc9hy8gN4IzxM0', // Firebase 콘솔에서 발급한 VAPID 키
            serviceWorkerRegistration: registration,
          })
            .then((currentToken) => {
              if (currentToken) {
                console.log('FCM Token:', currentToken);
                setToken(currentToken);

                // ✅ 서버로 토큰 전송
                saveTokenToServer(currentToken);
              } else {
                console.warn('No registration token available.');
              }
            })
            .catch((err) => {
              console.error('An error occurred while retrieving token.', err);
            });
        });
    }

    // 포그라운드 메시지 수신
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      const { title, body } = payload.data;
      setMessage({ title, body });

      // 🟡 alert 창으로 표시
      alert(`[알림] ${title}\n${body}`);

      // Firebase Analytics에 이벤트 기록
      logEvent(analytics, 'fcm_message_received', {
      title: title || '(no title)',
      body: body || '(no body)',
      message_id: payload.messageId || '(no id)',
      });
      
    });

  }, []);




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {message && (
          <div style={{ marginTop: '20px' }}>
            <p><strong>최근 알림:</strong></p>
            <p>제목: {message.title}</p>
            <p>내용: {message.body}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;