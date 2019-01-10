import React, { Component } from 'react';
import './Input.css';

interface InputState {
  isActive: boolean;
}

class Input extends Component<{}, InputState> {
  inputRef!: HTMLInputElement;
  constructor(props: {}) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutSide);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutSide);
  }

  handleClickOutSide = (e: Event) => {
    if (this.inputRef && !this.inputRef.contains(e.target as Node)) {
      this.setState({
        isActive: false,
      });
    }
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.inputRef.blur();
      this.setState({
        isActive: false,
      });
    }
  };

  render() {
    return (
      <div className="box">
        <input
          className={`input${this.state.isActive ? ' active' : ''}`}
          type="text"
          ref={node => (this.inputRef = node as HTMLInputElement)}
          onClick={() => this.setState({ isActive: true })}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default Input;
