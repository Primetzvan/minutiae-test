import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'
import {useQuery} from "react-query";
import {Door, getUsers, updateDoor} from "../shared/API";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import {inspect} from "util";



class ColorPicker extends React.Component<{uuid: string, color: string, refetch: Function}> {
  state = {
    displayColorPicker: false,
    color: this.props.color,
  };

  rgbToHex(r: number, g: number, b: number) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = async (color: { rgb: any; }) => {
      let hex = this.rgbToHex(color.rgb.r, color.rgb.g, color.rgb.b);
      await updateDoor(this.props.uuid, { color: hex })()
      await this.props.refetch();
      this.setState({color: hex})
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: this.state.color,
        },
        colors:
            ["#70A07C", "#9EB6A3", "#D0E8D2", "#D2F4FF", "#9FCEEB",  "#ACB5E8", "#D2D0E8", "#FFD2F5", "#ECD1FF", "#A99AC2", "#9F7FC8", "#BE7FC8", "#AB9999", "#C29AB5", "#FFD2D2", "#FFA6A6", "#FFE177", "#F3FFD1"],
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
        }
//         colors:[
//           ["#7B81B5",
//            "#7FACC8",
//            "#9FCEEB",
//            "#D2F4FF",
//            "#D2D0E8",
//            "#ACB5E8",
//            "#A99AC2",
//            "#9F7FC8",
//            "#BE7FC8",
//            "#ECD1FF",
//            "#AB9999",
//            "#C29AB5",
//            "#FFA6A6",
//            "#FFD2D2",
//            "#FFD2F5",
//            "#839E89",
//            "#9EB6A3",
//            "#D0E8D2"]
//         ]
      },
    });



    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <CirclePicker onChange={ this.handleChange } colors={styles.colors}/>
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker
