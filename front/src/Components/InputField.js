import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";


const uploader = Uploader({
    apiKey: "free"
});

function InputField(props) {
    return (
        <>
            {
                props.type === "file" ?
                    <> <Form.Group as={Col} md="6" >
                        <Form.Label>{props.name}</Form.Label>
                        <InputGroup >
                            <UploadButton options={{ mimeTypes: ["image/jpeg", "image/png"] }} uploader={uploader}
                                onComplete={files => files[0] ? props.handleChangePicture(files[0].fileUrl) : null}>
                                {({ onClick }) =>
                                    <button onClick={onClick}>
                                        {props.value ? <b>Change Photo</b> : <b>Upload a photo...</b>}
                                    </button>
                                }
                            </UploadButton>
                        </InputGroup>

                    </Form.Group>
                    </> :
                    <Form.Group as={Col} md="6" >
                        <Form.Label>{props.name}</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type={props.type}
                                name={props.name.toLowerCase().replace(/\s/g, '')}
                                placeholder={props.name}
                                aria-describedby="inputGroupPrepend"
                                required
                                onChange={props.handleChange}
                                defaultValue={props.value}

                            />
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