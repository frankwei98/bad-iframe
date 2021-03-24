import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useMemo } from 'react';

const getHostnameFromRegex = (url) => {
    // run against regex
    const matches = url.match(/\/\/([^/?#]+)(?:[/?#]|$)/i)
    // extract hostname (will be null if no match is found)
    return matches && matches[1]
}

export default function Home() {
  const [ theBlockedUrl, updateBlockUrl ] = useState(null);

  useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('url')) {
            updateBlockUrl(decodeURIComponent(urlParams.get('url')))
        }
  }, [])

  const theBlockedHostname = useMemo(() => {
      if (!theBlockedUrl) return '未提供'
      else return getHostnameFromRegex(theBlockedUrl)
  }, [theBlockedUrl])

  return (
    <div className={styles.container}>
      <Head>
        <title>Matataki iframe safety tips</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            🙇‍♀️🙇对不起，打扰了 
            <span className={styles.description}>Sorry for the interruption</span>
        </h1>
        <p>我们暂时不支持⚠️ <code className={styles.hostname}>{theBlockedHostname}</code> ⚠️的内容嵌入</p>
        <p>如果你的服务有嵌入 Matataki 文章的需求，请联系 Matataki 团队。</p>
        <a className={styles.link} href={theBlockedUrl} target="_blank" rel="noopener noreferrer nofollow">🙋 我知道未知链接有风险，且坚持访问（在新窗口打开，我们不对其内容负责）</a>
      </main>

      <footer className={styles.footer}>
        Matataki 安全团队
      </footer>
    </div>
  )
}
