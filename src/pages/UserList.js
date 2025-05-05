import "../App.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "../components/Pagination";
import { createUser, getUsers } from "../services/userService";
import UserModal from "../components/UserModal";

function UserList() {
    const [lists, setLists] = useState([]);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const loadingRef = useRef();
    const navigate = useNavigate();

    const closeLoading = () => {
        loadingRef.current.classList.add("hidden");
    };

    useEffect(() => {
        getUsers()
            .then((res) => {
                closeLoading();
                setLists(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleClick = (id) => {
        navigate("/detail", {
            state: { userId: id },
        });
    };

    const handleSubmitCreate = (data) => {
        createUser(data)
            .then((res) => {
                toast("User created");
                setModalOpen(false);
                setLists((prev) => [res.data, ...prev]);
            })
            .catch((err) => console.log(err));
    };

    const filteredList = lists.filter(
        (list) =>
            list.name.toLowerCase().includes(search.toLowerCase()) ||
            list.age?.toString().includes(search)
    );

    return (
        <>
            <div className="container" style={{ marginTop: "36px" }}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="nav-wrap">
                            <label htmlFor="search">Search</label>
                            <input
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="loading" ref={loadingRef}>
                        Loading....
                    </div>
                    <Pagination
                        data={filteredList}
                        itemsPerPage={11}
                        handleClick={handleClick}
                        handleCreate={() => setModalOpen(true)}
                    />
                </div>
            </div>

            <UserModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialData={null}
                onSubmit={handleSubmitCreate}
            />
        </>
    );
}

export default UserList;
