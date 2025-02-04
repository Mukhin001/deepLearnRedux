import { memo, useState } from "react";
import { AppState, createAppSelector, useAppDispatch, useAppSelector, User, UserId, UserRemoveSelectedAction, UserSelectedAction } from "./store";

const selectSortedUsers = createAppSelector(
    (state: AppState) => state.users.ids,
    (state: AppState) => state.users.entities,
    (_: AppState, sort: 'asc' | 'desc') => sort,
    (ids, entities, sort) =>
         ids
            .map((id) => entities[id])
            .sort((a, b) => {
                if(sort === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            })
);

// const selectSelectUser = (state: AppState) =>
//     state.users.selectedUserId
//         ? state.users.entities[state.users.selectedUserId]
//         : undefined;

const UsersList = () => {
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

    // const ids = useAppSelector((state) => state.users.ids);
    // const entities = useAppSelector((state) => {
    //     console.log('render');
    //     return state.users.entities
    // });
    // const selectedUserId = useAppSelector((state) => state.users.selectedUserId);

    const sortedUsers = useAppSelector((state) => selectSortedUsers(state, sortType));
    const selectedUserId = useAppSelector((state) => state.users.selectedUserId);
    //const selectedUser = selectedUserId ? entities[selectedUserId] : undefined;
    // const sortedUsers = useMemo(
    //     () => 
    //     ids
    //         .map((id) => entities[id])
    //         .sort((a, b) => {
    //             if(sortType === 'asc') {
    //                 return a.name.localeCompare(b.name);
    //             } else {
    //                 return b.name.localeCompare(a.name);
    //             }
    //         }),
    //     [ids, entities, sortType]
    // );

    return ( 
        <section>
            <h3>Users List</h3>
            {!selectedUserId ? (
                <div>
                    <div>
                        <button
                            onClick={() => setSortType('asc')}>
                            Asc
                       </button>
                       <button
                            onClick={() => setSortType('desc')}>
                            Desc
                       </button>
                    </div>
                    <ul>
                        {sortedUsers.map((user) => (
                            <UserListItem userId={user.id} key={user.id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <SelectedUser userId={selectedUserId} />
            ) }
        </section>
     );
};

/// li внутри не перерисовавыются из за memo
const UserListItem = memo(function UserListItem({ userId }: { userId: UserId }) {
    const user = useAppSelector((state) => state.users.entities[userId]);
    const dispatch = useAppDispatch();
    const handleUserClick = () => {
        dispatch({
            type: 'userSelected',
            payload: { userId: user.id },
        } satisfies UserSelectedAction);
    };
    return (
        <li style={{listStyle: 'none'}} key={user.id} onClick={handleUserClick}>
            <span
                style={{cursor: 'pointer'}}>{user.name}
            </span>
        </li>
    );
});

function SelectedUser({ userId }: { userId: UserId }) {
    const user = useAppSelector((state) => state.users.entities[userId]);
    const dispatch = useAppDispatch();
    const handlebackButtonClick = () => {
        dispatch({
            type: 'userRemoveSelected',
            } satisfies UserRemoveSelectedAction);
    };

    return (
        <section>
            <button
                onClick={handlebackButtonClick}>
                Back
            </button>
            <h2>{user.name}</h2>
            <p>{user.description}</p>
        </section>
    );
};
 
export default UsersList;