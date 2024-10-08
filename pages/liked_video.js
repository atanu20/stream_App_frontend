import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import CardVideo from '../components/videos/CardVideo';
import HistoryVideo from '../components/videos/HistoryCard';
import { apilink } from '../utils/data';

const Liked_video = ({ login, allvideo }) => {
  useEffect(() => {
    if (!login) {
      Cookies.remove('_showbox_access_user_tokon_');
      localStorage.removeItem('_showbox_access_user_login');
      console.clear();
      window.location.href = `/login`;
    }
  }, []);
  return (
    <Layout>
      <div className="p-3">
        <br />
        <p>
          <b>Liked Video</b>
        </p>
        <HistoryVideo allvideo={allvideo} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Liked_video;

export const getServerSideProps = async ({ req, res }) => {
  const tokon = req.cookies._showbox_access_user_tokon_
    ? req.cookies._showbox_access_user_tokon_
    : null;
  const ress = await axios.get(`${apilink}/auth/isVerify`, {
    headers: {
      Authorization: tokon,
    },
  });

  const resvideo = await axios.get(`${apilink}/api/user/getLikedVideo`, {
    headers: {
      Authorization: tokon,
    },
  });

  return {
    props: {
      login: ress.data.success,
      userInfo: ress.data.userInfo || [],
      allvideo: resvideo.data.allvideo || [],
    },
  };
};
