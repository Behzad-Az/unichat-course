import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import axios from 'axios';
import { NewChatForm } from 'react-chat-engine';
import { useAuth } from '../contexts/AuthContext.jsx';

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log(user);
  const creds = {

  };

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if(!user) {
      history.push('/');
      return;
    }
    axios.get('https://api.chatengine.io/users/me/', {
      headers: {
        'Project-Id': '474487ab-be02-41be-b1da-7cf62d41c2fb',
        'User-Name': user.displayName,
        'User-Secret': user.uid,
      }
    })
    .then(result => {
      if(result.data.username) {
        setLoading(false);
      } else {
        throw 'no user found';
      }
    })

    .catch(e => {
      let formdata = new FormData()
      formdata.append('email', user.email)
      formdata.append('username', user.displayName)
      formdata.append('secret', user.uid)

      getFile(user.photoURL)
      .then(avatar => {
        formdata.append('avatar', avatar, avatar.name)

        axios.post(
          'https://api.chatengine.io/users/',
          formdata,
          { headers: { "private-key": '10262bec-cb90-4ebd-b053-9617609027c0' }}
        )
        .then(() => setLoading(false))
        .catch(e => console.log('e: ', e.response));
      });
    })
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // .catch(error => {
    //   let formData = new FormData();
    //   formData.append('email', user.email);
    //   formData.append('user-name', user.email);
    //   formData.append('user-secret', user.uid)
    //   getFile(user.photoURL)
    //     .then((avatar) => {
    //       formData.append('avatar', avatar, avatar.name);
    //       axios.post(
    //         'https://api.chatengine.io/users/',
    //         // formData,
    //         {
    //           headers: {
    //             'project-id': '474487ab-be02-41be-b1da-7cf62d41c2fb',
    //             'private-key': '10262bec-cb90-4ebd-b053-9617609027c0',
    //             'user-name': user.email,
    //             'user-secret': user.uid
    //           }
    //         }
    //       )
    //       .then(() => setLoading(false))
    //       .catch(console.err);
    //     });
    // })


  }, [user, history]);

  if (!user || loading) return 'Loading...';

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          UniChat
        </div>
        <div className='logout-tab' onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='474487ab-be02-41be-b1da-7cf62d41c2fb'
        userName={user.displayName}
        userSecret={user.uid}



        // renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
        // renderChatCard={(chat, index) => <ChatCard key={`${index}`} chat={chat} />}
        renderNewChatForm={() => <br/>}
        // renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
        // renderChatHeader={(chat) => <ChatHeader />}
        // renderIceBreaker={(chat) => <IceBreaker />}
        // renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => <MessageBubble lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
        // renderSendingMessage={(creds, chat, lastMessage, message, nextMessage) => <MessageBubble sending={true} lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
        // renderIsTyping={(typers) => <IsTyping />}
        // renderConnectionBar={(chat) => <ConnectionBar />}
        // renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
        // renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
        // renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
        // renderPeopleSettings={(creds, chat) => <PeopleSettings />}
        // renderPhotosSettings={(chat) => <PhotosSettings />}
        // renderOptionsSettings={(creds, chat) => <OptionsSettings />}

      />
    </div>
  );
}

export default Chats;


// import React, { useRef, useState, useEffect } from "react"

// import axios from 'axios'
// import { useHistory } from "react-router-dom"
// import { ChatEngine } from 'react-chat-engine'

// import { useAuth } from "../contexts/AuthContext"

// import { auth } from "../firebase"

// export default function Chats() {
//   const didMountRef = useRef(false)
//   const [ loading, setLoading ] = useState(true)
//   const { user } = useAuth()
//   const history = useHistory()

//   async function handleLogout() {
//     await auth.signOut()
//     history.push("/")
//   }

//   async function getFile(url) {
//     let response = await fetch(url);
//     let data = await response.blob();
//     return new File([data], "test.jpg", { type: 'image/jpeg' });
//   }

//   useEffect(() => {
//     if (!didMountRef.current) {
//       didMountRef.current = true

//       if (!user || user === null) {
//         history.push("/")
//         return
//       }

//       // Get-or-Create should be in a Firebase Function
//       axios.get(
//         'https://api.chatengine.io/users/me/',
//         { headers: {
//           "Project-Id": '474487ab-be02-41be-b1da-7cf62d41c2fb',
//           "User-Name": user.email,
//           "User-Secret": user.uid
//         }}
//       )

//       .then(result => {
//         console.log("I'm here UUUUUUUUUUUUUUUUUU: ", result);
//         setLoading(false);
//       })



//       .catch(e => {
//         console.log("Error here QQQQQQQQQQQQQQQQQ: ", e.response);
//         let formdata = new FormData()
//         formdata.append('email', user.email)
//         formdata.append('username', user.email)
//         formdata.append('secret', user.uid)

//         getFile(user.photoURL)
//         .then(avatar => {
//           formdata.append('avatar', avatar, avatar.name)

//           axios.post(
//             'https://api.chatengine.io/users/',
//             formdata,
//             { headers: { "private-key": '10262bec-cb90-4ebd-b053-9617609027c0' }}
//           )
//           .then(() => setLoading(false))
//           .catch(e => console.log('Error here HHHHHHHHHHHHHHHHHHHHHHHHH: ', e.response))
//         })
//       })
//       // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//     }
//   }, [user, history])


//   if (!user || loading) return <div />

//   return (
//     <div className='chats-page'>
//       <div className='nav-bar'>
//         <div className='logo-tab'>
//           Unichat
//         </div>

//         <div onClick={handleLogout} className='logout-tab'>
//           Logout
//         </div>
//       </div>

//       <ChatEngine
//         height='calc(100vh - 66px)'
//         projectID='7474487ab-be02-41be-b1da-7cf62d41c2fb'
//         privateKey='10262bec-cb90-4ebd-b053-9617609027c0'
//         userName={user.email}
//         userSecret={user.uid}
//       />
//     </div>
//   )
// }