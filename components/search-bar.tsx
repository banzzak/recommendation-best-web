import styles from "./search-bar.module.css";

import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import React from 'react';

import { AutoComplete, Input } from '@geist-ui/react';
// import clientPromise from "../lib/mongo";

async function getProducts(value: string) {
  console.log("getProducts");
  const sampleKeywords = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["잠옷", "세탁기", "여성패딩"]);
    }, 200);
  });
  
  return sampleKeywords;

  const client = await clientPromise;
  const db = client.db("recommendation-best");
  const collection = db.collection<{ name: string }>("keywords");
  const results = await collection.find({ name: { $regex: value, $options: "i" } }).toArray();
  client.close();
  return results;
}

const SearchBar: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    console.log("useEffect");
    console.log(searchQuery)
    getProducts(searchQuery).then((results) => {
      console.log("isMounted: " + isMounted);
      if (isMounted) {
        console.log(results);
        setSearchResults(results);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChanged called");

    if (event.target) {
      setSearchQuery(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit called");

    event.preventDefault();
    console.log(searchQuery);
    router.push({
      pathname: '/' + searchQuery,
    });
  };

  const handleOptionSelect = (value: string, event: React.FormEvent<HTMLFormElement>) => {
    console.log("handleOptionSelect called");
    setSearchQuery(value);
    handleSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AutoComplete 
      value={searchQuery} 
      // TODO : Use options:))) Oh Yeah~
      placeholder="Search for products" 
      onChange={handleChange} 
      onSelect={handleOptionSelect}/>
    </form>
  );
};

export default SearchBar;

