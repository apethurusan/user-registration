import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserEdit = () => {
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [address, addresschange] = useState("");
    const [country, countrychange] = useState("");
    const [validation, valchange] = useState(false);
    const [password, passwordchange] = useState("");
    const [gender, genderchange] = useState("");
    const [role, rolechange] = useState("");
    const [auth, setAuth] = useState("");

    const navigate = useNavigate();

    const { userid } = useParams();

    //Find login person's role
    const getAuth = () => {
        let username = sessionStorage.getItem("username");
        fetch("http://localhost:8000/user/" + username)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setAuth(resp.role);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getAuth();
        fetch("http://localhost:8000/user/" + userid)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                idchange(resp.id);
                namechange(resp.name);
                emailchange(resp.email);
                phonechange(resp.phone);
                addresschange(resp.address);
                passwordchange(resp.password);
                countrychange(resp.country);
                genderchange(resp.gender);
                rolechange(resp.role);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();
        const userdata = {
            id,
            name,
            email,
            phone,
            role,
            country,
            address,
            gender,
            password,
        };
        fetch("http://localhost:8000/user/" + userid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userdata),
        })
            .then((res) => {
                toast.success('edited');
                if (auth === "admin") {
                    // navigate("/user");
                    navigate(-1);
                } else {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return (
        <div>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: "50px" }}>
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h4>{userid} Edit</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Id</label>
                                        <input
                                            disabled
                                            value={id}
                                            onChange={(e) => idchange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            value={password}
                                            type="password"
                                            onChange={(e) => passwordchange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            required
                                            value={name}
                                            onMouseDown={(e) => valchange(true)}
                                            onChange={(e) => namechange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                        {name.length == 0 && validation && (
                                            <span className="text-danger">Enter the name</span>
                                        )}
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            value={email}
                                            onChange={(e) => emailchange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="number"
                                            value={phone}
                                            onChange={(e) => phonechange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Country <span className="errmsg">*</span>
                                        </label>
                                        <select
                                            value={country}
                                            onChange={(e) => countrychange(e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="srilanka">SriLanka</option>
                                            <option value="india">India</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                            value={address}
                                            onChange={(e) => addresschange(e.target.value)}
                                            className="form-control"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input
                                            type="radio"
                                            checked={gender === "male"}
                                            onChange={(e) => genderchange(e.target.value)}
                                            name="gender"
                                            value="male"
                                            className="app-check"
                                        ></input>
                                        <label>Male</label>
                                        <input
                                            type="radio"
                                            checked={gender === "female"}
                                            onChange={(e) => genderchange(e.target.value)}
                                            name="gender"
                                            value="female"
                                            className="app-check"
                                        ></input>
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button className="btn btn-success" type="submit">
                                Save
                            </button>
                            &nbsp;
                            <Link to="/" className="btn btn-danger">
                                Back
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
