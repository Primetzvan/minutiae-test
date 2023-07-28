import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '112',
      g: '160',
      b: '124',
      a: '1',
    },
   
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color: { rgb: any; }) => {
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute' as 'absolute',
          zIndex: 2,
          backgroundColor: '#fff',
          
        },
        cover: {
          position: 'fixed' as 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        colors:[
          ["#7B81B5",
           "#7FACC8",
           "#9FCEEB",
           "#D2F4FF",
           "#D2D0E8",
           "#ACB5E8",
           "#A99AC2",
           "#9F7FC8",
           "#BE7FC8",
           "#ECD1FF",
           "#AB9999",
           "#C29AB5",
           "#FFA6A6",
           "#FFD2D2",
           "#FFD2F5",
           "#839E89", 
           "#9EB6A3", 
           "#D0E8D2"]
        ]
      },
    });

    

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <CirclePicker onChange={ this.handleChange }/>
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker