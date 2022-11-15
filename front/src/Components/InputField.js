import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import Button from 'react-bootstrap/Button';


const uploader = Uploader({
    apiKey: "free"
});

function InputField(props) {
    return (
        <>
            {
                props.type === "file" ?
                    <Form.Group as={Col}  >
                        <Form.Label>{props.name}</Form.Label>
                        <InputGroup >
                            <UploadButton options={{ mimeTypes: ["image/jpeg", "image/png"] }} uploader={uploader}
                                onComplete={files => files[0] ? props.handleChangePicture(files[0].fileUrl) : null}>
                                {({ onClick }) =>
                                    <Button size="lg" variant='outline-primary' onClick={onClick} style={{ width: "15rem" }}>
                                        {props.value ? <span>Change Photo</span> : <span>Upload a photo</span>}
                                    </Button>
                                }
                            </UploadButton>
                        </InputGroup>

                    </Form.Group>
                    :
                    <Form.Group as={Col}  >
                        <Form.Label>{props.name}</Form.Label>
                        <InputGroup hasValidation>
                            {props.name === "Nickname" ? <Form.Control
                                type={props.type}
                                name={props.name.toLowerCase().replace(/\s/g, '')}
                                placeholder={props.name}
                                aria-describedby="inputGroupPrepend"
                                onChange={props.handleChange}
                                defaultValue={props.value}

                            /> : <Form.Control
                                type={props.type}
                                name={props.name.toLowerCase().replace(/\s/g, '')}
                                placeholder={props.name}
                                aria-describedby="inputGroupPrepend"
                                required
                                onChange={props.handleChange}
                                defaultValue={props.value}

                            />}

                            <Form.Control.Feedback type="invalid">
                                Please enter a valid {props.name}.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
            }

        </>


    )
}

export default InputField