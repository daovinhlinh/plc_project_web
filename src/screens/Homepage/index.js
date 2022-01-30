import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, realtimeDb } from "../../firebase";
import { set, ref, onValue, update, runTransaction } from "firebase/database";

import "./index.css";
import QRCode from "qrcode.react";

const Homepage = () => {
    const [user, error] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    const [XsensorData, setXSensorData] = useState([]);
    const [YsensorData, setYSensorData] = useState([]);
    const [forwardHigh, setForwardHigh] = useState();
    const [forwardMed, setForwardMed] = useState();
    const [reverseHigh, setReverseHigh] = useState();
    const [reverseMed, setReverseMed] = useState();
    const [motor, setMotor] = useState();
    const [motorHighForward, setMotorHighForward] = useState();
    const [motorHighReverse, setMotorHighReverse] = useState();
    const [motorMedForward, setMotorMedForward] = useState();
    const [motorMedReverse, setMotorMedReverse] = useState();
    const [power, setPower] = useState();

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
            console.log(data.name);
            setUserData(data);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
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

    const fetchForwardHigh = () => {
        try {
            onValue(
                ref(realtimeDb, `/Forward Limit Switch High`),
                (snapshot) => {
                    const data = snapshot.val();

                    if (data !== null) {
                        setForwardHigh(data);
                    }
                }
            );
        } catch (e) {
            alert(e);
        }
    };

    const fetchForwardMed = () => {
        try {
            onValue(
                ref(realtimeDb, `/Forward Limit Switch Med`),
                (snapshot) => {
                    const data = snapshot.val();
                    if (data !== null) {
                        setForwardMed(data);
                    }
                }
            );
        } catch (e) {
            alert(e);
        }
    };

    const fetchMotor = () => {
        try {
            onValue(ref(realtimeDb, `/Motor`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    console.log(data);
                    setMotor(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchMotorHighForward = () => {
        try {
            onValue(ref(realtimeDb, `/Motor High Forward`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    console.log(data);
                    setMotorHighForward(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchMotorHighReverse = () => {
        try {
            onValue(ref(realtimeDb, `/Motor High Reverse`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    console.log(data);
                    setMotorHighReverse(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchMotorMedForward = () => {
        try {
            onValue(ref(realtimeDb, `/Motor Med Forward`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    console.log(data);
                    setMotorMedForward(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchMotorMedReverse = () => {
        try {
            onValue(ref(realtimeDb, `/Motor Med Reverse`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    console.log(data);
                    setMotorMedReverse(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchReverseHigh = () => {
        try {
            onValue(
                ref(realtimeDb, `/Reverse Limit Switch High`),
                (snapshot) => {
                    const data = snapshot.val();
                    if (data !== null) {
                        setReverseHigh(data);
                    }
                }
            );
        } catch (e) {
            alert(e);
        }
    };

    const fetchPower = () => {
        try {
            onValue(ref(realtimeDb, `/Power`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    setPower(data);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const fetchReverseMed = () => {
        try {
            onValue(
                ref(realtimeDb, `/Reverse Limit Switch Med`),
                (snapshot) => {
                    const data = snapshot.val();
                    if (data !== null) {
                        setReverseMed(data);
                    }
                }
            );
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
        // if (loading) return;
        // console.log(user);
        if (!user) return navigate("/");

        fetchUserName();
        // }

        if (highSensor.Address == "") {
            fetchHighSensor();
        }

        if (medSensor.Address == "") {
            fetchMedSensor();
        }
        if (lowSensor.Address == "") {
            fetchLowSensor();
        }

        fetchForwardHigh();
        fetchForwardMed();
        fetchReverseHigh();
        fetchReverseMed();
        fetchMotor();
        fetchMotorHighForward();
        fetchMotorHighReverse();
        fetchMotorMedForward();
        fetchMotorMedReverse();
        fetchPower();
    }, []);

    useEffect(() => {
        if (
            forwardHigh &&
            forwardMed &&
            reverseHigh &&
            reverseMed &&
            motor &&
            motorHighForward &&
            motorHighReverse &&
            motorMedForward &&
            motorMedReverse &&
            power &&
            userData
        ) {
            let xSensor = [forwardHigh, forwardMed, reverseHigh, reverseMed];
            let ySensor = [
                motor,
                motorHighForward,
                motorHighReverse,
                motorMedForward,
                motorMedReverse,
            ];
            xSensor.sort((a, b) => a.Address - b.Address);
            ySensor.sort((a, b) => a.Address - b.Address);

            setXSensorData(xSensor);
            setYSensorData(ySensor);
            setLoading(false);
        }
    }, [
        forwardHigh,
        forwardMed,
        reverseHigh,
        reverseMed,
        motor,
        motorHighForward,
        motorHighReverse,
        motorMedForward,
        motorMedReverse,
        userData,
        power,
    ]);

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <div className="container">
            <div className="app_bar">
                <div className="tab_list">
                    <p
                        className={`tab__btn ${tab === 0 && "active_tab"}`}
                        onClick={() => setTab(0)}
                    >
                        Trang chủ
                    </p>
                    <p
                        className={`tab__btn ${tab === 1 && "active_tab"}`}
                        onClick={() => setTab(1)}
                    >
                        Tín hiệu
                    </p>
                    <p
                        className={`tab__btn ${tab === 2 && "active_tab"}`}
                        onClick={() => setTab(2)}
                    >
                        Thông tin
                    </p>
                </div>
                <div className="homepage__info">
                    <div className="homepage__name">
                        Welcome, {userData.name}
                    </div>
                    <button className="logout_btn" onClick={handleLogout}>
                        Đăng xuất
                    </button>
                </div>
            </div>

            {tab === 0 ? (
                <div className="sensor_control">
                    <div className="header">
                        <h1 className="header__sensor">
                            {userData.sensorName}
                        </h1>
                        <h3 className="header__status">
                            Status: {power.Value}
                        </h3>
                    </div>
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
                                    <td>{lowSensor.Value}</td>
                                    <td>{medSensor.Value}</td>
                                    <td>{highSensor.Value}</td>
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
            ) : tab === 1 ? (
                <div className="sensor_control">
                    <h1>Tín hiệu</h1>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    {XsensorData.map((sensor, key) => {
                                        return (
                                            <th key={key}>{sensor.Address}</th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {XsensorData.map((sensor) => (
                                        <td>
                                            <span
                                                className={`dot ${
                                                    sensor.Value == "OFF"
                                                        ? "dot__off"
                                                        : "dot__on"
                                                }`}
                                            ></span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>

                        <table className="table">
                            <thead>
                                <tr>
                                    {YsensorData.map((sensor, key) => {
                                        return (
                                            <th key={key}>{sensor.Address}</th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {YsensorData.map((sensor) => (
                                        <td>
                                            <span
                                                className={`dot ${
                                                    sensor.Value == "OFF"
                                                        ? "dot__off"
                                                        : "dot__on"
                                                }`}
                                            ></span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="information">
                    <QRCode
                        id="qrcode"
                        value="https://docs.google.com/spreadsheets/d/1ceCy2Pywder4Zra_MUcSEJEhHoa4kNhUN8HOvR45Gkg/edit#gid=0"
                        size={290}
                        level={"H"}
                        includeMargin={true}
                    />
                    <h1>MITSUBISHI ELECTRIC CUP AUTOMATION 2021</h1>
                    <h3>GIÁM SÁT HỆ THỐNG PHÂN LOẠI SẢN PHẨM BẰNG QR CODE</h3>
                    <p>NHÓM: HKL</p>
                </div>
            )}
        </div>
    );
};

export default Homepage;
