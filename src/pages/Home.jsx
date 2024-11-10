import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import Loader from '../components/Loader/Loader';
import '../home.css'; // Import the CSS file

function Home() {
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        appwriteService.getPosts().then((response) => {
            if (response) {
                setPosts(response.documents);
            }
            setLoader(false);
        }).catch(() => {
            setLoader(false);
        });
    }, []);

    return (
        <div className="w-screen py-8">
            <Container>
                {loader ? (
                    <div className="loader">
                        <Loader />
                    </div>
                ) : (
                    posts.length === 0 ? (
                        <div className="no-posts">
                            <h1 className="text-2xl font-bold">
                                No Blogs Found. Create a new one!
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-3 w-auto">
                                    <div className="post-card">
                                        <PostCard {...post} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </Container>
        </div>
    );
}

export default Home;