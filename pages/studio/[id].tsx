import React, { useEffect, useState, createRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createStudio } from "@mux/studio-embed";

const StudioPage: NextPage = () => {
  const router = useRouter();
  const { isReady: isRouterReady } = router;
  const { id, participantId, role } = router.query;
  const [studioJWT, setStudioJWT] = useState("");
  const studioContainerRef = createRef<HTMLDivElement>();

  // GET request to get the JWT
  useEffect(() => {
    if (!isRouterReady) return;
    // wait for the useRouter hook to asynchronously get the studio id and participant id
    if (!id) {
      console.warn("No studio selected");
      return;
    }
    if (!participantId) {
      console.warn("No participant id specified");
      return;
    }

    const fetchJWT = async () => {
      const response = await fetch(
        `/api/token/${id}?participantId=${participantId}&role=${role}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const parsedResponse = await response.json();
      setStudioJWT(parsedResponse?.studioJWT);
    };

    fetchJWT();
  }, [isRouterReady, id, participantId]);

  useEffect(() => {
    if (studioJWT && studioContainerRef.current?.childNodes.length == 0) {
      createStudio(studioJWT, studioContainerRef.current as HTMLDivElement);
    }
  }, [studioJWT]);

  return (
    <>
      <Head>
        <title>Mux Studio</title>
        <meta
          name="description"
          content="A live streaming app built on Mux Studio"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div ref={studioContainerRef}></div>
    </>
  );
};

export default StudioPage;
