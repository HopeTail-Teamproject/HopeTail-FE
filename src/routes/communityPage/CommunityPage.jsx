import React, { useState, useEffect } from 'react';
import './CommunityPage.css';
import CommunityCard from '../../components/common/communityCard/CommunityCard';
import LeftSidebar from '../../components/common/leftSidebar/LeftSidebar';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/language/LanguageContext';

const CommunityPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const dummyPosts = [
    {
      id: 1,
      title: '우리 강아지 이야기',
      content: '정말 귀엽고 사랑스러워요!\n매일 산책 나가요.',
      username: 'happy_dog_mom',
      createdAt: '2025/05/10',
      likeCount: 12,
      isBookmarked: false,
      category: 'Story',
      imageUrl: '/images/image.png',
    },
    {
      id: 2,
      title: '건강관리 꿀팁',
      content: '정기적인 예방접종이 중요합니다.\n동물병원도 추천해요.',
      username: 'vetlover',
      createdAt: '2025/05/09',
      likeCount: 5,
      isBookmarked: true,
      category: 'Tips',
      imageUrl: '/images/image.png',
    },
    {
      id: 3,
      title: 'QnA: 강아지 짖는 문제',
      content: '짖는 걸 줄이려면 어떻게 해야 하나요?\n도움이 필요합니다.',
      username: 'puppyQ',
      createdAt: '2025/05/08',
      likeCount: 3,
      isBookmarked: false,
      category: 'QnA',
      imageUrl: '/images/image.png',
    },
    {
      id: 4,
      title: '산책 중 조심해야 할 것들',
      content: '차 조심! 다른 개에게 짖지 않게 훈련하는 방법',
      username: 'walker',
      createdAt: '2025/05/07',
      likeCount: 9,
      isBookmarked: false,
      category: 'Tips',
      imageUrl: '/images/image.png',
    },
    {
      id: 5,
      title: '우리 집 개는 천재예요!',
      content: '가르쳐주지도 않았는데 앉아를 해요.',
      username: 'proud_owner',
      createdAt: '2025/05/06',
      likeCount: 15,
      isBookmarked: true,
      category: 'Story',
      imageUrl: '/images/image.png',
    },
    {
      id: 6,
      title: 'QnA: 사료 추천 좀 해주세요',
      content: '소형견 키우는데 어떤 사료가 좋은가요?',
      username: 'foodie_dog',
      createdAt: '2025/05/05',
      likeCount: 6,
      isBookmarked: false,
      category: 'QnA',
      imageUrl: '/images/image.png',
    },
    {
      id: 7,
      title: '산책로 추천합니다!',
      content: '안산 호수공원 좋아요.\n사람도 개도 많고 예뻐요.',
      username: 'ansanwalker',
      createdAt: '2025/05/04',
      likeCount: 4,
      isBookmarked: true,
      category: 'Story',
      imageUrl: '/images/image.png',
    },
    {
      id: 8,
      title: 'QnA: 접종 언제부터 하나요?',
      content: '강아지 처음 키우는데 첫 접종 시기 궁금해요.',
      username: 'newbie_parent',
      createdAt: '2025/05/03',
      likeCount: 2,
      isBookmarked: false,
      category: 'QnA',
      imageUrl: '/images/image.png',
    },
    {
      id: 9,
      title: '강아지 목욕 꿀팁',
      content: '욕조 대신 작은 풀장을 쓰면 좋아요!',
      username: 'bathmaster',
      createdAt: '2025/05/02',
      likeCount: 7,
      isBookmarked: true,
      category: 'Tips',
      imageUrl: '/images/image.png',
    },
  ];

  useEffect(() => {
    setPosts(dummyPosts);
    setFilteredPosts(dummyPosts);
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.category === category);
      setFilteredPosts(filtered);
    }

    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="community-wrapper">
      <div className="community-body">
        <LeftSidebar />
        <main className="community-main">
          <div className="community-header">
            <h2 className="community-title">Community</h2>
            <div className="community-title-underline"></div>
          </div>

          <div className="community-content-box">
            <div className="notice-row">
              <span className="notice-label">Notice</span>
              <span className="notice-text">
                Thank you for visiting our community. Please read the{' '}
                <span
                  className="guideline-link"
                  onClick={() => navigate('/community/guideline')}
                >
                  guidelines
                </span>.
              </span>
            </div>

            <div className="toolbar-row">
              <div className="category-block">
                <span className="category-label">Category</span>
                <select
                  className="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All</option>
                  <option value="Story">Story</option>
                  <option value="Tips">Tips</option>
                  <option value="QnA">QnA</option>
                </select>
              </div>

              <button
                className="new-post-button"
                onClick={() => navigate('/community/new')}
              >
                New Post
              </button>
            </div>

            <div className="card-grid">
              {paginatedPosts.map((post) => (
                <CommunityCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/community/${post.id}`)}
                />
              ))}
            </div>

            <div className="pagination">
              <button
                className="page-btn circle"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                ≪
              </button>
              <button
                className="page-btn circle"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ＜
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`page-btn circle ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="page-btn circle"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ＞
              </button>
              <button
                className="page-btn circle"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                ≫
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
