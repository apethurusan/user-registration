import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
    const [custlist, custupdate] = useState([]);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        GetUserAccess();
        loaduser();
    }, []);

    //Find all users details
    const loaduser = () => {
        fetch("http://localhost:8000/user?role=user")
            .then((res) => {
                if (!res.ok) {
                    return false;
                }
                return res.json();
            })
            .then((res) => {
                custupdate(res);
            });
    };

    const GetUserAccess = () => {
        const userrole =
            sessionStorage.getItem("userrole") != null
                ? sessionStorage.getItem("userrole").toString()
                : "";
        fetch(
            "http://localhost:8000/roleaccess?role=" + userrole + "&menu=customer"
        )
            .then((res) => {
                if (!res.ok) {
                    navigate("/");
                    // toast.warning('You are not authorized to access');
                    return false;
                }
                return res.json();
            })
            .then((res) => {
                if (res.length > 0) {
                    viewchange(true);
                    let userobj = res[0];
                    editchange(userobj.haveedit);
                    addchange(userobj.haveadd);
                    removechange(userobj.havedelete);
                } else {
                    navigate("/");
                    toast.warning("You are not authorized to access");
                }
            });
    };

    //Function of only admin can add new user
    const handleadd = () => {
        if (haveadd) {
            navigate("/user/create");
        } else {
            toast.warning("You are not having access for add");
        }
    };

    //Function of only admin can modify any user
    const handleedit = (id) => {
        if (haveedit) {
            navigate("/user/edit/" + id);
        } else {
            toast.warning("You are not having access for Edit");
        }
    };

    //Function of only admin can delete any user
    const handleremove = (id) => {
        if (haveremove) {
            if (window.confirm("Do you want to remove?")) {
                fetch("http://localhost:8000/user/" + id, {
                    method: "DELETE",
                })
                    .then((res) => {
                        toast.error("deleted");
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                        
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        } else {
            toast.warning("You are not having access for remove");
        }
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="card">
                <div className="card-header">
                    <h4>Users</h4>
                </div>
                <div className="card-body">
                    <button
                        onClick={handleadd}
                        className="btn btn-success"
                        style={{ marginBottom: "10px" }}
                    >
                        Add (+)
                    </button>

                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th className="text-center">Username</th>
                                <th className="text-center">Full Name</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Phone</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist &&
                                custlist.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => {
                                                    handleedit(item.id);
                                                }}
                                                className="btn btn-primary"
                                            >
                                                Edit
                                            </button>
                                            &nbsp;
                                            <button
                                                onClick={() => {
                                                    handleremove(item.id);
                                                }}
                                                className="btn btn-danger"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User;
