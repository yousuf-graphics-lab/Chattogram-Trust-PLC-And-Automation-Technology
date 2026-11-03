import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { BlogPost, GalleryItem, Notice, SiteContent } from '@/types';
import {
  getContent,
  getGallery,
  getNotices,
  getPosts,
  saveContent,
  saveGallery,
  saveNotices,
  savePosts,
} from '@/lib/storage';

interface DataContextValue {
  notices: Notice[];
  posts: BlogPost[];
  gallery: GalleryItem[];
  content: SiteContent;
  setNotices: (n: Notice[]) => void;
  setPosts: (p: BlogPost[]) => void;
  setGallery: (g: GalleryItem[]) => void;
  setContent: (c: SiteContent) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [notices, setNoticesState] = useState<Notice[]>(() => getNotices());
  const [posts, setPostsState] = useState<BlogPost[]>(() => getPosts());
  const [gallery, setGalleryState] = useState<GalleryItem[]>(() => getGallery());
  const [content, setContentState] = useState<SiteContent>(() => getContent());

  const setNotices = useCallback((n: Notice[]) => {
    saveNotices(n);
    setNoticesState(n);
  }, []);
  const setPosts = useCallback((p: BlogPost[]) => {
    savePosts(p);
    setPostsState(p);
  }, []);
  const setGallery = useCallback((g: GalleryItem[]) => {
    saveGallery(g);
    setGalleryState(g);
  }, []);
  const setContent = useCallback((c: SiteContent) => {
    saveContent(c);
    setContentState(c);
  }, []);

  const value = useMemo(
    () => ({
      notices,
      posts,
      gallery,
      content,
      setNotices,
      setPosts,
      setGallery,
      setContent,
    }),
    [notices, posts, gallery, content, setNotices, setPosts, setGallery, setContent]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
