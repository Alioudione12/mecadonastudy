import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions' 

function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userList= useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin= useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete= useSelector(state => state.userDelete)
    const {success:successDelete} = userDelete

    useEffect (()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            navigate('/login')
        }
        

    },[dispatch,navigate, userInfo, successDelete])

    const deleteHandler = (id)=>{
        if(window.confirm(" Etes-vous sure: supprimer cet utilisateur")){
        dispatch(deleteUser(id))
        }
    }

    return (
        <div>
        <h2>Liste des utilisateurs</h2>
        {loading ? (<Loader/>):error 
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOM</th>
                                <th>EMAIL</th>
                                <th>ADMINISTRATEUR</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>(
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className='fas fa-check' style={{color:"green"}}></i>
                                    ): (
                                        <i className='fas fa-check' style={{color:"red"}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant="success" className='btn-sm m-2 rounded'>
                                            Modifier
                                            </Button>
                                        </LinkContainer>
                                            <Button variant="danger" className='btn-sm m-2 rounded' 
                                                onClick={()=>deleteHandler(user._id)}>
                                            Supprimer
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </div>
  )
}

export default UserListScreen