import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Studentlist from './component/Studentlist'

class App extends Component {
    
    state = {
    students: null,
    filter: '',
    tagFilter: '',
    }
    
    componentDidMount() {
        fetch("https://www.hatchways.io/api/assessment/students")
        .then(r => r.json())
        .then(
              (result) => {
              this.setState({
                            students: result.students
                            });
              console.log(result);
              },
              (error) => {
              console.log(error);
              }
              )
    }
    
    addTag = (e, id) => {
        if (e.key === 'Enter' && e.target.value !== ""){
            let students = [...this.state.students];
            let student = students[id-1];
            if(this.state.students[id-1].tags === undefined){
                student.tags = [e.target.value];
                
            } else {
                student.tags.push(e.target.value);
            }
            students[id-1] = student;
            this.setState({
                          students: students
                          })
            console.log(this.state);
        }
    }
    

    
    filtering = (event) => {
        this.setState({
                      filter: event.target.value
                      })
    }
    
    tagFiltering = (event) => {
        this.setState({
                      tagFilter: event.target.value
                      });
    }
    
        render() {
        let list = null;
        let filteredStudents = null;
        
        
        if(this.state.students != null){
            filteredStudents =  this.state.students.filter(
                                                           s =>
                                                           s.firstName.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
                                                           || s.lastName.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
                                                           );
            
            if (this.state.tagFilter !== '') {
                filteredStudents =  filteredStudents.filter(
                                                            s =>
                                                            s.tags !== undefined
                                                            && s.tags.indexOf(this.state.tagFilter) !== -1
                                                            );
            }
            
            list = (
                    <div id="list">
                    {
                    filteredStudents.map(s => {
                                         return <Studentlist student={s} addTag={this.addTag} key={s.id}/>
                                         })
                    }
                    </div>
                    );
        }
        
        
        
        return (
                <div className="App">
                <input className="filterInput" type="text" placeholder="Search by name" onChange={this.filtering}/>
                <input className="filterInput" type="text" placeholder="Search by tag" onChange={this.tagFiltering}/>
                {list}
                </div>
                );
    }
}

export default App;
