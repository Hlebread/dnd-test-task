import { useState } from "react";
import Head from "next/head";

import PrintPage from "../components/PrintPage";
import { PageHeader } from "../styles/TestPage.styled";
import data from "../data/images.json";

export default function Testpage() {
  const [pages, setPages] = useState(data);

  return (
    <div>
      <Head>
        <title>Test Page | Popsa.com</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader>
        <h1>Trip to the Beach</h1>
        <p>Hardback Photobook last edited on Thursday 13 April 2022 at 16:28</p>
      </PageHeader>
      <PrintPage data={pages} setData={setPages} />
    </div>
  );
}
