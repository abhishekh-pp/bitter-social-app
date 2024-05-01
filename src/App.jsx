import React, { useState, useEffect } from 'react';
import Logo from './assets/logo.png';
import { FaRegHeart, FaRegComment, FaRegBookmark, FaRegShareSquare, FaUser, FaHome, FaSearch, FaBell, FaEnvelope, FaBookOpen, FaUsers, FaUserCircle, FaEllipsisH, FaReact } from 'react-icons/fa';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();

        const combinedData = data.map(post => {
          const user = usersData.find(user => user.id === post.userId);
          return { ...post, user };
        });

        setPosts(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSuggestedUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        const loggedInUser = data.find(user => user.id === 3);
        
        const filteredUsers = data.filter(user => user.id !== 3);
        
        setSuggestedUsers(filteredUsers.slice(0, 4));
        
        setLoggedInUser(loggedInUser);
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      }
    };
    

    fetchPosts();
    fetchSuggestedUsers();
  }, []);

  const handleNewPostChange = event => {
    setNewPostText(event.target.value);
  };

  const handlePostSubmit = () => {
    console.log('New post:', newPostText);
    setIsPostSubmitted(true);
    console.log(loggedInUser)
    setNewPostText('');
  };

  const handleSearchChange = event => {
    setSearchText(event.target.value);
  };

  const handleLikeClick = postId => {
    if (!likedPosts.includes(postId)) {
      setLikedPosts([...likedPosts, postId]);
    } else {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    }
  };

  const handleSaveClick = postId => {
    if (!savedPosts.includes(postId)) {
      setSavedPosts([...savedPosts, postId]);
    } else {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    }
  };

  const handleShareClick = postId => {
    if (!sharedPosts.includes(postId)) {
      setSharedPosts([...sharedPosts, postId]);
    } else {
      setSharedPosts(sharedPosts.filter(id => id !== postId));
    }
  };

 

  return (
    <div className="min-h-screen flex justify-center bg-black text-white">
      <div className="max-w-full-lg w-full lg:pl-48 px-4 py-8 relative flex justify-between">
        <div className="hidden lg:block sticky top-0 flex flex-col items-center justify-start h-screen pt-3">
          <div className='mb-20'>
            <img className="w-20  text-white mb-4 " src={Logo} alt="Bitter Logo" />
          </div>
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaHome className="text-white mr-2" />
              <span className="text-white">Home</span>
            </div>
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaSearch className="text-white mr-2" />
              <span className="text-white">Explore</span>
            </div>
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaBell className="text-white mr-2" />
              <span className="text-white">Notification</span>
            </div>
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaEnvelope className="text-white mr-2" />
              <span className="text-white">Message</span>
            </div>
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaBookOpen className="text-white mr-2" />
              <span className="text-white">Bookmarks</span>
            </div>
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaUsers className="text-white mr-2" />
              <span className="text-white">Communities</span>
            </div>
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaUserCircle className="text-white mr-2" />
              <span className="text-white">Profile</span>
            </div>
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-700">
              <FaEllipsisH className="text-white mr-2" />
              <span className="text-white">More</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 ">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {/* <FaUser className="w-8 h-8 mr-2" /> */}
              {loggedInUser && (
             <img src={`https://robohash.org/${loggedInUser.id}.png`} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />)}
              <input
                type="text"
                value={newPostText}
                onChange={handleNewPostChange}
                placeholder="What's on your mind?"
                className="flex-grow bg-gray-900 text-white px-4 py-6 rounded-md mr-2"
              />
              <button onClick={handlePostSubmit} className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-6 rounded-md">Post</button>
            </div>
          </div>


          {isPostSubmitted && (
            <div className="rounded-lg  p-4 mb-4 bg-black border-2 border-gray-600">
              <div className="flex items-center mb-2">
                {loggedInUser && (
                  <img src={`https://robohash.org/${loggedInUser.id}.png`} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                )}
                <div>
                  <strong>{loggedInUser ? loggedInUser.name : ''}</strong> ({loggedInUser ? loggedInUser.username : ''})
                </div>
              </div> 
              <p className="text-gray-300">{newPostText}</p>
              <div className="flex mt-8">
                <div className="flex w-full justify-between lg:mx-24 sm:mx-4 space-x-4">
                  <FaRegHeart
                    onClick={() => handleLikeClick('new-post')}
                    className={`hover:text-red-500 cursor-pointer`}
                  />
                  <FaRegComment onClick={() => handleCommentClick('new-post')} className="hover:text-yellow-500 cursor-pointer " />
                  <FaRegBookmark
                    onClick={() => handleSaveClick('new-post')}
                    className={`hover:text-blue-500 cursor-pointer`}
                  />
                  <FaRegShareSquare
                    onClick={() => handleShareClick('new-post')}
                    className={`hover:text-green-500 cursor-pointer`}
                  />
                </div>
              </div>
            </div>
          )}




          <div>
            {posts.map(post => (
              <div key={post.id} className="rounded-lg  p-4 mb-4 bg-black border-2 border-gray-600">
                <div className="flex items-center mb-2">
                  <img src={`https://robohash.org/${post.user.id}.png`} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <strong>{post.user.name}</strong> ({post.user.username})
                  </div>
                </div>
                <p className="text-gray-300">{post.body}</p>
                <div className="flex mt-8">
                  <div className="flex w-full justify-between lg:mx-24 sm:mx-4 space-x-4">
                    <FaRegHeart
                      onClick={() => handleLikeClick(post.id)}
                      className={`hover:text-red-500 cursor-pointer ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                    />
                        <FaRegComment onClick={() => handleCommentClick(post.id)} className="hover:text-yellow-500 cursor-pointer " />

                    <FaRegBookmark
                      onClick={() => handleSaveClick(post.id)}
                      className={`hover:text-blue-500 cursor-pointer ${savedPosts.includes(post.id) ? 'text-blue-500' : ''}`}
                    />
                    <FaRegShareSquare
                      onClick={() => handleShareClick(post.id)}
                      className={`hover:text-green-500 cursor-pointer ${sharedPosts.includes(post.id) ? 'text-green-500' : ''}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 hidden lg:block sticky top-0 flex flex-col items-center justify-start h-screen ">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center mb-4">
              <FaSearch className="w-4 h-4 mr-2" />
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search"
                className="flex-grow bg-gray-900 text-white px-14 py-2 rounded-md mr-2"
              />
            </div>
            <div className="border border-gray-400 p-3 rounded-xl cursor-pointer lg:w-4/6">
              <h1 className="text-white font-bold mb-2 ">Subscribe to Premium</h1>
              <p className="text-white text-sm mb-2">Subscribe to unlock new features and if eligible, receive a share of ads revenue</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-2xl">Subscribe</button>
            </div>
            <div className='border rounded-xl lg:w-4/6 flex flex-col items-start'>
              <h3 className="text-white font-bold p-3 mb-2">People who you may know</h3>
              {suggestedUsers.map(user => (
                <div className='flex flex-row justify-between  p-2' key={user.id}>
                  <div className="flex items-center justify-center p-3 rounded-full cursor-pointer">
                    <img src={`https://robohash.org/${user.id}.png`} alt="User Avatar" className="w-6 h-6 rounded-full mr-2" />
                    <span className="text-white">{user.name}</span>
                  </div>
                  <div className='flex justify-center items-center'>
                    <button className="bg-white text-black font-semibold px-2 py-1 rounded-xl">Follow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-900 p-4 flex justify-around items-center">
        <FaHome className="text-white cursor-pointer" />
        <FaSearch className="text-white cursor-pointer" />
        <FaBell className="text-white cursor-pointer" />
        <FaEnvelope className="text-white cursor-pointer" />
        <FaEllipsisH className="text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default PostList;
