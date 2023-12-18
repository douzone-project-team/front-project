import React, {ChangeEvent, Component} from "react";
import {EmployeeContext} from "../../store/Employee/employee-context";
import {initialUpdateEmployee} from "../../state/employeeStateMangement";
import {EmployeeState} from "../../object/Employee/employee-object";
import {Avatar, Box} from "@material-ui/core";

type ProfileImageProps = {
}

type ProfileImageState = {
    selectedImage: File | null;
}

class MainImage extends Component<ProfileImageProps, ProfileImageState> {
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
                marginRight: '10px',
            }}
            >
                {this.state.selectedImage ? (
                    <img
                        src={URL.createObjectURL(this.state.selectedImage)}
                        alt="새 이미지"
                        style={{
                            marginLeft:'10px',
                            width:'160%',
                            maxWidth: '250px',
                            height:'150%',
                            maxHeight: '250px',
                            marginTop: '10px',
                            marginBottom: "10px",
                            borderRadius: '100%'
                        }}/>
                ) : employeeData.employeeNo !== 0 ? (
                    <Avatar src={('http://localhost:8080/employees/'+employeeData.employeeNo+'/image')}
                         style={{
                             marginLeft:'10px',
                             width:'160%',
                             maxWidth: '250px',
                             height:'150%',
                             maxHeight: '250px',
                             marginTop: '10px',
                             marginBottom: "10px",
                             borderRadius: '100%'
                         }}/>
                ) : (
                    <div> 이미지 없음 </div>
                )}
            </Box>
        )
    }
}

export default MainImage;