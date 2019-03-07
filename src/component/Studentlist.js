import React, { Component } from 'react';
import './Studentlist.css';

class Studentlist extends Component {
    state = {
    sign: '+',
    tagText: ''
    }
    
    s = this.props.student;
    style = {
    display: 'none'
    }
    
    
    enterTag = e => {
        this.props.addTag(e, this.s.id);
        if (e.key === 'Enter'){
            document.getElementById("tagInput" + this.s.id).value = '';
        }
        
    }
    
    openDetails = () => {
        if(this.state.sign === "+"){
            this.setState({sign: "-"});
            this.style = {
            display: 'block'
            }
        } else {
            this.setState({sign: "+"});
            this.style = {
            display: 'none'
            }
        }
    }
    
    render(){
        let average = 0;
        for(let i=0; i<this.s.grades.length; i++){
            average += parseInt(this.s.grades[i]);
        }
        average /= this.s.grades.length;
        
        return (
                <div id="student">
                <div className="avatar">
                <img alt="" src={this.s.pic}/>
                </div>
                <div className="info">
                <h1 className="studentName">{this.s.firstName} {this.s.lastName}</h1>
                <div className="details">
                <p className="details">
                Email: {this.s.email}<br/>
                Company: {this.s.company}<br/>
                Skill: {this.s.skill}<br/>
                Average: {average}%
                </p>
                { this.s.grades !== null && this.s.grades !== 0 ?
                <div className="grades" style={this.style}>
                {
                this.s.grades.map((s,i) => {
                                  return <p key={i}>Test {i+1}: {s}%</p>
                                  })
                }
                {
                this.props.student.tags !== undefined && this.props.student.tags !== 0 ?
                <div className="tags">
                {
                this.props.student.tags.map((s,i) => {
                                            return <p className="tag" key={i}>{s}</p>
                                            })
                }
                </div>
                : null
                }
                <input id={"tagInput" + this.s.id} type="text" placeholder="Add a tag" onKeyPress={e => this.enterTag(e)}/>
                </div> : null
                }
                </div>
                </div>
                <div className="plus">
                <p onClick={this.openDetails}>{this.state.sign}</p>
                </div>
                </div>
                )
    }
};

export default Studentlist
