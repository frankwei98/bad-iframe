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
        <p>根据我们最新的
            <a href="https://matataki.io/p/7770" className={styles.link} target="_blank">安全规定</a>，
            我们暂时不支持⚠️ <code className={styles.hostname}>{theBlockedHostname}</code> ⚠️的内容嵌入</p>
        <p>如果你的服务有嵌入 Matataki 文章的需求，
            请在 <a 
            href="https://github.com/Matataki-io/Matataki-FE/blob/testing/config/iframe-whitelist.json"
            className={styles.link} target="_blank">GitHub 提起 PR</a>，我们会尽快审核。
        </p>
        <p>⚠️ 点击下方的「坚持访问」，代表你知晓未知链接的风险并自己承担其带来的一切后果。</p>
        <a className={styles.link} href={theBlockedUrl} target="_blank" rel="noopener noreferrer nofollow">🙋 坚持访问</a>
      </main>

      <footer className={styles.footer}>
        Matataki 安全团队
      </footer>
    </div>
  )
}
