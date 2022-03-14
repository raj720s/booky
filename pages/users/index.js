import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
function Data({ users }) {
  return (
    <div className={styles.container}>
      <table id="users">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>details</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Link href={`/users/${user.id}`}>
                <a style={{ color: "#4caf50" }}>View Details</a>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const users = await res.json();

  return {
    props: {
      users,
    },
  };
};

export default Data;
