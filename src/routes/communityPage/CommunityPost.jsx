import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/common/leftSidebar/LeftSidebar';
import { useLanguage } from '../../context/language/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp as faThumbsUpRegular,
  faBookmark as faBookmarkRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faShareNodes,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import communityPostText from '../../lib/i18n/communityPost';
import './CommunityPost.css';

const dummyPost = {
  id: 1,
  title: '입양한 지 100일, 서로를 닮아가는 중이에요',
  images: [
    '/HopeTail-FE/images/default_img.png',
    '/HopeTail-FE/images/default_img.png',
    '/HopeTail-FE/images/default_img.png',
  ],
  content: `처음 만났을 땐 서로 낯설고 어색했지만,  
이제는 제 하루가 루나로 시작해 루나로 끝나요.  
낯을 많이 가리던 아이가 지금은 먼저 꼬리 흔들며 다가오고,  
제 표정만 봐도 제 마음을 알아채는 것 같아요.  
입양을 망설였던 지난날이 미안할 정도로, 루나는 제 삶에 큰 선물이에요.  
혹시 두려운 마음에 고민 중이시라면, 먼저 다가가 보세요.  
그 선택이 누군가의 전부가 될 수도 있으니까요.`,
  author: {
    name: '따뜻한봄날',
    email: 'warmday@tail.com',
    avatar: '/HopeTail-FE/images/user.png',
  },
  stats: {
    likes: 102,
  },
};

const dummyComments = [
  {
    id: 1,
    author: '햇살냥이',
    text: '읽으면서 눈물이 났어요… 저도 입양 준비 중인데 많은 힘이 되었어요!',
    avatar: '/HopeTail-FE/images/user.png',
  },
  {
    id: 2,
    author: '구름산책',
    text: '아이의 변화를 이렇게 자세히 적어주셔서 감사해요. 진심이 느껴집니다.',
    avatar: '/HopeTail-FE/images/user.png',
  },
  {
    id: 3,
    author: '보리맘',
    text: '저희 보리도 처음엔 구석에만 있었는데, 이젠 제 뒤를 졸졸 따라다녀요 ㅎㅎ 공감돼요!',
    avatar: '/HopeTail-FE/images/user.png',
  },
  {
    id: 4,
    author: '달빛산책자',
    text: '서로를 닮아간다는 표현 너무 아름답네요… 입양은 사랑의 시작이란 말이 떠올라요.',
    avatar: '/HopeTail-FE/images/user.png',
  },
  {
    id: 5,
    author: '감자소년',
    text: '루나와의 이야기가 정말 따뜻해요. 글 써주셔서 감사합니다!',
    avatar: '/HopeTail-FE/images/user.png',
  },
];

const CommunityPost = () => {
  const { language } = useLanguage();
  const text = communityPostText[language] || communityPostText["en"];

  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(dummyPost.stats.likes);
  const totalPages = 3;

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (likedPosts.includes(dummyPost.id)) {
      setLiked(true);
    }
  }, []);

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (newLiked) {
      likedPosts.push(dummyPost.id);
    } else {
      likedPosts = likedPosts.filter((id) => id !== dummyPost.id);
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  };

  const handleCommentKeyPress = (e) => {
    if (e.key === 'Enter' && comment.trim()) {
      setComment('');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="community-post-page">
      <LeftSidebar />

      <div className="community-post-main">
        <div className="community-title">{text.title}</div>
        <div className="community-title-underline" />

        <input
          type="text"
          className="post-title-input"
          value={dummyPost.title}
          readOnly
        />

        <div className="post-images-row">
          {dummyPost.images.map((src, idx) => (
            <div key={idx} className="post-image-box">
              <img src={src} alt={`post-img-${idx}`} className="post-image" />
            </div>
          ))}
        </div>

        <textarea
          className="post-content-textarea"
          value={dummyPost.content}
          readOnly
        />

        <div className="post-user-container">
          <div className="post-user-box">
            <div className="user-info-box">
              <img
                src={dummyPost.author.avatar}
                alt="author-avatar"
                className="user-avatar"
              />
              <div className="user-info">
                <div className="user-name">{dummyPost.author.name}</div>
                <div className="user-email">{dummyPost.author.email}</div>
              </div>
            </div>
          </div>

          <div className="action-buttons-box right-align">
            <div className="action-buttons">
              <div className="action" onClick={handleLikeClick}>
                <FontAwesomeIcon
                  icon={faThumbsUpRegular}
                  className={`icon ${liked ? 'liked' : ''}`}
                />
                <span className="action-label">{likesCount}</span>
              </div>
              <div className="action">
                <FontAwesomeIcon icon={faBookmarkRegular} className="icon" />
              </div>
              <div className="action">
                <FontAwesomeIcon icon={faShareNodes} className="icon" />
              </div>
              <div className="action">
                <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="comment-section">
          <textarea
            className="comment-input"
            placeholder={text.commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleCommentKeyPress}
          />

          <div className="comment-list-table">
            {dummyComments.map((c) => (
              <div key={c.id} className="comment-row">
                <div className="comment-user">
                  <img src={c.avatar} alt="comment-avatar" />
                  <span>{c.author}</span>
                </div>
                <div className="comment-text">{c.text}</div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button className="page-btn circle" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>≪</button>
            <button className="page-btn circle" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>＜</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} className={`page-btn circle ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn circle" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>＞</button>
            <button className="page-btn circle" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>≫</button>
          </div>
        </div>
      </div>

      <div className="post-ads">
        <img className="ad-box" src="/HopeTail-FE/images/AD.png" alt="AD1" />
        <img className="ad-box" src="/HopeTail-FE/images/AD.png" alt="AD2" />
        <img className="ad-box" src="/HopeTail-FE/images/AD.png" alt="AD3" />
      </div>
    </div>
  );
};

export default CommunityPost;
