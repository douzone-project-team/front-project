import React, {ChangeEvent, Component} from "react";
import {EmployeeContext} from "../../store/Employee/employee-context";
import {EmployeeState} from "../../object/Employee/employee-object";
import {Box} from "@material-ui/core";

type ProfileImageProps = {
}

type ProfileImageState = {
    selectedImage: File | null;
}

class ProfileImage extends Component<ProfileImageProps, ProfileImageState> {
    static contextType = EmployeeContext;

    constructor(props: ProfileImageProps) {
        super(props);

        this.state = {
            selectedImage: null,
        }
    }

    handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const state = this.context as EmployeeState;

        const storedEmployeeData = localStorage.getItem('employee');
        const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};

        if (e.target.files && e.target.files.length > 0) {
            const imageFile = e.target.files[0];
            this.setState({selectedImage: imageFile});

            await state.updateImage(employeeData.employeeNo, imageFile);
            window.location.reload();
        }
    }

    render() {
        const storedEmployeeData = localStorage.getItem('employee');
        const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};

        return (
            <Box style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: '20px'
            }}
            >
                {this.state.selectedImage ? (
                    <img
                        src={URL.createObjectURL(this.state.selectedImage)}
                        alt="새 이미지"
                        style={{
                            width: '200px',
                            height: '250px',
                            marginTop: '10px',
                            marginBottom: "10px",
                            borderRadius: '20%'
                        }}/>
                ) : employeeData.employeeNo !== 0 ? (
                    <img src={('http://localhost:8080/employees/'+employeeData.employeeNo+'/image')}
                         style={{
                             maxWidth: '200px',
                             maxHeight: '250px',
                             marginTop: '10px',
                             marginBottom: "10px",
                             borderRadius: '20%'
                         }}/>
                ) : (
                    <div> 이미지 없음 </div>
                )}
                <button onClick={() => document.getElementById('fileInput')?.click()}
                        style={{
                            backgroundColor: '#546ae8',
                            width: '50px',
                            height: '30px',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                >
                    선택
                    <input id='fileInput' type='file' accept='image/*' style={{display: 'none'}}
                           onChange={this.handleImageChange}/>
                </button>
            </Box>
        )
    }
}

export default ProfileImage;