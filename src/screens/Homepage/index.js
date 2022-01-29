import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, realtimeDb } from "../../firebase";
import { set, ref, onValue, update, runTransaction } from "firebase/database";

import "./index.css";

const Homepage = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [tab, setTab] = useState(0);

    const [highSensor, setHighSensor] = useState({
        Address: "",
        Value: "",
    });

    const [medSensor, setMedSensor] = useState({
        Address: "",
        Value: "",
    });

    const [lowSensor, setLowSensor] = useState({
        Address: "",
        Value: "",
    });

    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"));
            const doc = await getDocs(q);

            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const fetchHighSensor = () => {
        try {
            onValue(ref(realtimeDb, `/Count High`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    setHighSensor(data);
                    console.log(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchMedSensor = () => {
        try {
            onValue(ref(realtimeDb, `/Count Medium`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    setMedSensor(data);
                    console.log(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchLowSensor = () => {
        try {
            onValue(ref(realtimeDb, `/Count Low`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    setLowSensor(data);
                    console.log(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const powerOn = () => {
        try {
            runTransaction(ref(realtimeDb, "/Power"), (data) => {
                console.log(data);
                if (data) {
                    if (data.Address && data.Value) {
                        console.log(data);
                        data.Value = "ON";
                    }
                }
                return data;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const powerOff = () => {
        try {
            runTransaction(ref(realtimeDb, "/Power"), (data) => {
                console.log(data);
                if (data) {
                    if (data.Address && data.Value) {
                        console.log(data);
                        data.Value = "OFF";
                    }
                }
                return data;
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
        fetchHighSensor();
        fetchMedSensor();
        fetchLowSensor();
    }, [user, loading]);

    return (
        <div className="container">
            <div className="app_bar">
                <div className="tab_list">
                    <p
                        className={`tab__btn ${tab == 0 && "active_tab"}`}
                        onClick={() => setTab(0)}
                    >
                        Sensor Control
                    </p>
                    <p
                        className={`tab__btn ${tab == 1 && "active_tab"}`}
                        onClick={() => setTab(1)}
                    >
                        Sensor Detail
                    </p>
                    <p
                        className={`tab__btn ${tab == 2 && "active_tab"}`}
                        onClick={() => setTab(2)}
                    >
                        Project information
                    </p>
                </div>
                <div className="homepage__info">
                    <div className="homepage__name">Welcome, {name}</div>
                    <button className="logout_btn" onClick={logout}>
                        Log Out
                    </button>
                </div>
            </div>

            {tab == 0 ? (
                <div className="sensor_control">
                    <h1>Plc project</h1>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product 1</th>
                                    <th>Product 2</th>
                                    <th>Product 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{highSensor.Value}</td>
                                    <td>{medSensor.Value}</td>
                                    <td>{lowSensor.Value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="action_btn">
                        <button className="start_btn" onClick={powerOn}>
                            Start
                        </button>
                        <button className="stop_btn" onClick={powerOff}>
                            Stop
                        </button>
                    </div>
                </div>
            ) : tab == 1 ? (
                <div className="sensor_control">
                    <h1>Plc project</h1>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product 1</th>
                                    <th>Product 2</th>
                                    <th>Product 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{highSensor.Value}</td>
                                    <td>{medSensor.Value}</td>
                                    <td>{lowSensor.Value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="action_btn">
                        <button className="start_btn" onClick={powerOn}>
                            Start
                        </button>
                        <button className="stop_btn" onClick={powerOff}>
                            Stop
                        </button>
                    </div>
                </div>
            ) : (
                <div>Information</div>
            )}
        </div>
    );
};

export default Homepage;
