/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';

import RNSketchCanvas from 'react-native-sketch-canvas';
import { SketchCanvas } from 'react-native-sketch-canvas';

export default class example extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#FF0000',
      thickness: 15,
      message: '',
      photoPath: null,
      scrollEnabled: true

      // path object

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>

            <SketchCanvas
              // localSourceImage={{ filename: 'whale.png', directory: SketchCanvas.MAIN_BUNDLE, mode: 'AspectFit' }}
              // localSourceImage={{ filename: 'bulb.png', directory: RNSketchCanvas.MAIN_BUNDLE }}
              ref={ref => this.canvas = ref}
              style={{ flex: 1 }}
              strokeColor={this.state.color}
              strokeWidth={this.state.thickness}
              onStrokeStart={(x, y) => {
                console.log('x: ', x, ', y: ', y)
                this.setState({ message: 'Start' })
              }}
              onStrokeChanged={(x, y) => {
                console.log('x: ', x, ', y: ', y)
                this.setState({ message: 'Changed' })
              }}
              onStrokeEnd={() => {
                this.setState({ message: 'End' })
              }}
              onPathsChange={(pathsCount) => {
                console.log('pathsCount', pathsCount)
              }}

            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'red' }]} onPress={() => {
                  this.setState({ color: '#FF0000' })
                }}>
                  <Text style={{ color: 'white' }}>Red</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'black' }]} onPress={() => {
                  this.setState({ color: '#000000' })
                }}>
                  <Text style={{ color: 'white' }}>Black</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'black' }]} onPress={() => {
                  this.canvas.undo();
                }}>
                  <Text style={{ color: 'white' }}>Undo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'black' }]} onPress={() => {
                  this.canvas.clear();
                }}>
                  <Text style={{ color: 'white' }}>Erase</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ marginRight: 8, fontSize: 20 }}>{this.state.message}</Text>
              <TouchableOpacity style={[styles.functionButton, { backgroundColor: 'black', width: 90 }]}
                onPress={() => {
                  let paths = this.canvas.getPaths(); // returns array?
                  
                  // [
                  //   { "drawer": null, "path": { "color": "#FF0000", "data": [Array], "id": 51333698, "width": 15 }, "size": { "height": 906, "width": 600 } },
                  //   { "drawer": null, "path": { "color": "#FF0000", "data": [Array], "id": 15537403, "width": 15 }, "size": { "height": 906, "width": 600 } },
                  //   { "drawer": null, "path": { "color": "#FF0000", "data": [Array], "id": 31282323, "width": 15 }, "size": { "height": 906, "width": 600 } }
                  // ]

                  console.log(paths);
                  Alert.alert(JSON.stringify(paths))


                  // this.canvas.getBase64('jpg', false, true, true, (err, result) => {

                  //   result.array.forEach(element => {
                  //     console.log(element.path.data);
                  //   });

                  // })
                }}>
                <Text style={{ color: 'white' }}>Get Paths</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignSelf: 'stretch'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  page: {
    flex: 1,
    height: 300,
    elevation: 2,
    marginVertical: 8,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 2
  }
});

AppRegistry.registerComponent('example', () => example);