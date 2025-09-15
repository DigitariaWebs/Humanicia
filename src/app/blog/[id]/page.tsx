"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BLOG_POSTS } from "../data";

// Define proper types
interface ContentBlock {
  type: "heading" | "paragraph" | "list";
  level?: number;
  text?: string;
  items?: string[];
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const postId = params?.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const foundPost = BLOG_POSTS.find((p) => p.id === postId) as BlogPost | undefined;

    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [postId]);

  // Reading progress effect
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  if (loading) {
    return (
      <main>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l&apos;article...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Article non trouvé
            </h1>
            <p className="text-gray-600 mb-6">
              L&apos;article que vous recherchez n&apos;existe pas.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-600 to-green-700 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 lg:p-16"
          >
            {/* Category */}
            <div className="mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-lg max-w-none space-y-2"
            >
              {post.content.map((block: ContentBlock, index: number) => {
                switch (block.type) {
                  case "heading":
                    if (block.level === 2) {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="mb-10 first:mt-0 group"
                        >
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-green-800 transition-colors duration-300">
                            {block.text}
                          </h2>
                          <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-green-700 rounded-full group-hover:from-green-700 group-hover:to-green-800 transition-all duration-300"></div>
                        </motion.div>
                      );
                    } else if (block.level === 3) {
                      return (
                        <motion.h3
                          key={index}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 mb-6 leading-tight flex items-center hover:text-green-700 transition-colors duration-300"
                        >
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0 group-hover:bg-green-700 transition-colors duration-300"></span>
                          {block.text}
                        </motion.h3>
                      );
                    }
                    break;
                  case "paragraph":
                    return (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="text-gray-700 leading-relaxed mb-8 text-base md:text-lg hover:text-gray-800 transition-colors duration-300"
                      >
                        {block.text}
                      </motion.p>
                    );
                  case "list":
                    return (
                      <motion.ul
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="mb-8 space-y-4"
                      >
                        {block.items?.map((item: string, itemIndex: number) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + itemIndex * 0.05,
                            }}
                            className="flex items-start text-gray-700 leading-relaxed hover:text-gray-800 transition-colors duration-300 group"
                          >
                            <span className="inline-flex items-center justify-center w-7 h-7 bg-green-100 text-green-700 rounded-full mr-4 mt-0.5 flex-shrink-0 text-sm font-semibold group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                              {itemIndex + 1}
                            </span>
                            <span className="text-base md:text-lg">{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    );
                  default:
                    return null;
                }
                return null;
              })}
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-gray-100"
            >
              <span className="text-gray-600 font-semibold mr-2 flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                Tags :
              </span>
              {post.tags.map((tag: string, index: number) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 text-sm font-medium rounded-full hover:from-green-100 hover:to-green-200 transition-all duration-200 cursor-pointer border border-green-200"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </main>
  );
}