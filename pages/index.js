import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const getHostnameFromRegex = (url) => {
    // run against regex
    const matches = url.match(/\/\/([^/?#]+)(?:[/?#]|$)/i)
    // extract hostname (will be null if no match is found)
    return matches && matches[1]
  }

  const theBlockedUrl = urlParams.get('url') ? decodeURIComponent(urlParams.get('url')) : null
  const theBlockedHostname = theBlockedUrl ? getHostnameFromRegex(theBlockedUrl) : '未提供'
  return (
    <div className={styles.container}>
      <Head>
        <title>Matataki iframe safety tips</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            对不起，打扰了 
        </h1>
        <h2 className={styles.description}>Sorry for the interruption</h2>
        <p>我们暂时不支持 <code>{theBlockedHostname}</code> 的内容嵌入</p>
        <p>如果有内嵌需求，请与联系 Matataki 团队。</p>
        <a className={styles.link} href={theBlockedUrl} target="_blank" rel="noopener noreferrer nofollow">坚持访问（在新窗口打开）</a>
      </main>

      <footer className={styles.footer}>
        Matataki 安全团队
      </footer>
    </div>
  )
}
