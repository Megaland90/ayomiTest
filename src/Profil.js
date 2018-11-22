import React, { Component } from 'react';
import { FormGroup, Button, Form, Label, Input ,  Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem} from 'reactstrap';
import Token from "./Token";

class Profil extends Component {


    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            profil : {
                lastname :"",
                firstname :"",
                email : "",
            }
        };

        this.toggle = this.toggle.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleFirstname = this.handleFirstname.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.loadProfil = this.loadProfil.bind(this)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    save()
    {
        var toogle = this.toggle;
        fetch("http://127.0.0.1:8000/app/users/update", {
            method :'POST',
            headers : {
                'Content-Type' : 'aplication/json',
                'Authorization' : Token.get()
            },
            body : JSON.stringify(this.state.profil)
        }).then(response => response.json().then(data => {
            if (data.statut === "OK")
            {
                toogle();
            }
        }))
    }

    cancel()
    {
        this.loadProfil();
        this.toggle();
    }

    loadProfil()
    {
        fetch("http://127.0.0.1:8000/app/users/", {
            method :'GET',
            headers : {
                'Authorization' : Token.get()
            },
        }).then(response => response.json().then(data => {
            if (data.statut === "OK")
            {
                this.setState({profil : data.profil});
            }
        }))
    }
    componentDidMount()
    {
        this.loadProfil();
    }

    handleEmail(e)
    {
        this.setState({
            profil: {...this.state.profil,email: e.target.value}
        })
    }

    handleFirstname(e)
    {
        this.setState({
            profil: {...this.state.profil,firstname: e.target.value}
        })
    }

    handleLastName(e)
    {
        this.setState({
            profil: {...this.state.profil,lastname: e.target.value}
        })
    }

    render() {
        return (
            <div>

                <div className="profil">
                    <ListGroup>
                        <ListGroupItem><strong>Email </strong> {this.state.profil.email}</ListGroupItem>
                        <ListGroupItem><strong>Nom </strong> {this.state.profil.lastname}</ListGroupItem>
                        <ListGroupItem><strong>Prénom </strong> {this.state.profil.firstname}</ListGroupItem>
                    </ListGroup>
                    <Button style={{marginTop:'20px'}} className="btn  btn-block btn-primary" onClick={this.toggle}>Modifier ses informations</Button>
                </div>


                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modifier ses informations</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" value={this.state.profil.email} onChange={this.handleEmail} id="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Nom</Label>
                                <Input type="text" name="name" value={this.state.profil.lastname} onChange={this.handleLastName} id="name" placeholder="Nom" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstname">Prénom</Label>
                                <Input type="text" name="firstname" value={this.state.profil.firstname} onChange={this.handleFirstname} id="firstname" placeholder="Prénom" />
                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.save}>Enregistrer</Button>{' '}
                        <Button color="secondary" onClick={this.cancel}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default Profil;
