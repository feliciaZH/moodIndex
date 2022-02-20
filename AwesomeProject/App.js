/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  PanResponder,
  Animated,
  useWindowDimensions 
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import greenFace2x from './image/greenFace2x.png'
import question2x from './image/question2x.png'
import orangeFace2x from './image/orangeFace2x.png'
import userIcon from './image/userIcon.png'
import Vector_28 from './image/Vector_28.png'
import base2x from './image/base2x.png'
import array from './AppData'
const totalH = 266
import {BoxShadow} from 'react-native-shadow'



const panResponderTemp = PanResponder.create({
  onStartShouldSetPanResponder: () => true,

  //手势移动，激活响应

  onMoveShouldSetPanResponder: (evt, gestureState) => {
    let {dy} = gestureState

    //如果手指垂直距离移动小于5，则不激活，否则激活标签的响应操作。目的是：使标签里面的点击事件能够正常使用，如果没有点击事件。可直接return true;

    return Math.abs(dy) > 5 || Math.abs(dx) > 5 ? true : false
  },
  onPanResponderGrant: (evt, gestureState) => {
    //
  },
  onPanResponderRelease: (evt, gs) => {
    // 滑动响应事件
    console.log(evt) // 父组件告诉子组件，我被点击了
    const [clickEvet, setClickEvent] = useState(null)
    setClickEvent(evt)
  },
  onPanResponderTerminate: (evt, gestureState) => {},
})
function BoxShadowItem (props) {
  const item = props.item
  const everyLineW = props.everyLineW
  const shadowOpt = {
    width: everyLineW + 3,
    height: item.style[1].height,
    color: '#000',
    radius: 10,
    opacity: 0.15,
    border: 4,
    x: 2,
    y: 4,
  }
  let css = [styles.line_box, ...item.style]
  css.push(styles.line_box_hover)
  css.push({width: everyLineW + 3})
  css = css.concat(item.hover)
  return (
    <BoxShadow setting={shadowOpt}>
      <View style={css}>
        <Text style={styles.score_box}>{item.y}</Text>
        <Image source={item.img} style={styles.face_box} />
      </View>
    </BoxShadow>
  )
}
function UnBoxShadowItem (props) {
  const item = props.item
  const everyLineW = props.everyLineW

  return (
    <View style={[styles.line_box, ...item.style, {width: everyLineW}]}>
      <Text style={styles.score_box}>{item.y}</Text>
      <Image source={item.img} style={styles.face_box} />
    </View>
  )
}
function Listitem (props) {
  // 声明一个叫 “count” 的 state 变量。
  const item = props.item
  // const refresh = props.refresh;
  const clickIndex = props.clickIndex

  function curHandleClick (item) {
    props.handleClick(item)
  }
  return (
    <View
      style={styles.week_box}
      onTouchStart={e => console.log('start')}
      onTouchMove={e => console.log('move')}
      onTouchEnd={e => curHandleClick(item)}>
      {item.clicked || clickIndex === item.index ? (
        <BoxShadowItem item={item} everyLineW={props.everyLineW}/>
      ) : (
        <UnBoxShadowItem item={item} everyLineW={props.everyLineW}/>
      )}
      <View style={[styles.week_day, item.clicked || clickIndex === item.index ? styles.week_day_hover:'']}>
        <Text>{item.x}</Text>
      </View>
    </View>
  )
}
function List (props) {
  const arraySrc = props.array
  arraySrc.forEach((val, index) => {
    if (val.y < 50) {
      val.style = [styles.low, {height: (val.y / 100) * totalH}]
      val.hover = [styles.hover_low]
      val.img = question2x
    } else if (val.y < 90) {
      val.style = [styles.good, {height: (val.y / 100) * totalH}]
      val.hover = [styles.hover_good]
      val.img = greenFace2x
    } else {
      val.style = [styles.high, {height: (val.y / 100) * totalH}]
      val.hover = [styles.hover_high]
      val.img = orangeFace2x
    }
    val.clicked = false
    val.index = index
  })
  const [array, setArray] = useState(arraySrc)
  // const [refresh, setRefresh] = useState(false);
  const [clickIndex, setClickIndex] = useState(-1)
  const handleClick = item => {
    console.log('子元素传递过来的值为：', item) //子元素传递过来的值为：100
    item.clicked = true
    setClickIndex(item.index)
    resetArray(item)
  }
  const resetArray = item => {
    array[item.index] = item
    array.map(val => {
      val.clicked = false
    })
    setArray([...array]) // 没有响应式
  }
  const listItems = array.map(item => (
    <Listitem
      everyLineW={props.everyLineW}
      key={item.y.toString()}
      item={item}
      handleClick={handleClick}
      clickIndex={clickIndex}
    />
  ))
  return <View style={[styles.app]}>{listItems}</View>
}
function UserInfo (props) {
  // const shadowOpt = {
  //   width: 390,
  //   height: 260,
  //   color: '#fff',
  //   radius: 16,
  //   opacity: 0.15,
  //   border: 4,
  //   x: 0,
  //   y: -6,
  // }
  return (

      <View style={styles.user_info}>
        <View style={styles.first_line}>
          <Image source={userIcon} style={styles.user_icon} />
          <Text style={styles.user_name}>李强</Text>
        </View>
        <Text style={styles.second_line}>88</Text>
        <Text style={styles.third_line}>周平均心情指数</Text>
      </View>
  
  )
}
function Nav(prop){
  return (
    <View style={styles.nav}> 
      <Image source={Vector_28} style={styles.nav_img} />
      <Text  style={styles.nav_title}>历史心情指数</Text>
    </View>
  );
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const everyLineW = windowWidth/7 - 12;
  
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Nav />
      
      <ScrollView >
        <UserInfo />
        <List array={array} everyLineW={everyLineW}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  app: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  line_box: {
    height: 258,
    width: 44,
    position: 'relative',
    borderRadius: 30,
    backgroundColor: '#52C873',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingRight: 0,
    paddingBottom: 4,
    paddingLeft: 0,
    animationName: 'line_anim',
    animationDuration: '1s',
    transition: ' transform 0.5s ease-in-out 0.5s',
  },
  score_box: {
    color: 'white',
    width: '100%',
    height: 25,
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 25,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  face_box: {
    width: 32,
    height: 32,
  },
  xiao: {
    textAlign: 'center',
  },
  yan: {
    height: '48%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  xiao_yan1: {
    flex: 1,
    height: 6,
    width: 3,
    borderRadius: 13,
  },
  xiao_yan2: {
    flex: 1,
    height: 6,
    width: 3,
    background: '#52C873',
    borderRadius: 13,
  },
  xiao_zui: {
    display: 'flex',
    width: 12,
    height: 4,
    border: '2 solid #52C873',
    borderRadius: 100,
    borderTop: 'none',
    marginBottom: 4,
  },
  mimi: {
    textAlign: 'center',
  },
  mimi_yan1: {
    display: 'flex',
    width: 7,
    height: 3,
    border: '2 solid #FF823C',
    borderRadius: 100,
    borderBottom: 'none',
  },
  mimi_yan2_box: {
    position: 'relative',
    display: 'flex',
    width: 8,
    height: 8,
  },
  mimi_yan2: {
    position: 'relative',
    left: -8,
    top: 2,
  },

  mimi_zui: {
    display: 'flex',
    width: 10,
    height: 4,
    border: '2 solid #FF823C',
    borderRadius: 100,
    marginBottom: 3,
  },
  question: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 44,
    display: 'flex',
    textAlign: 'center',
    letterSpacing: -0.3,
    color: '#929292',
  },
  week_box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 6,
    marginRight: 6,
    marginTop: 50,
    height: 288,
    marginBottom: 150
  },

  week_day: {
    /* content_18 */

    fontFamily: 'PingFang HK',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    height: 25,
    lineHeight: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: -0.3,
    marginTop: 17,
    /* Function 33 */

    color: '#2D2F33',
  },
  week_day_hover: {
    width: 36,
    height: 36,
    backgroundColor: '#2D2F33',
    borderRadius: 8,
    /* cate green */
    color: '#52C873'
  },
  low: {
    backgroundColor: '#CFCFCF',
  },
  good: {
    backgroundColor: '#52C873',
  },
  high: {
    backgroundColor: '#FF823C',
  },
  line_box_hover: {
    transform: [{scale: 1.05}],
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#DCFFD6',
  },
  hover_low: {
    backgroundColor: '#CFCFCF',
  },
  hover_good: {
    backgroundColor: '#A1FD44',
  },
  hover_high: {
    backgroundColor: '#FFCC4A',
  },

  user_info: { 
    width: 390,
    height: 399,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24
  },
  first_line: {
    width: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 44,
    background:`url(${base2x})`
  },
  user_icon: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 40,
  },
  user_name: {
    /* title_20 */
    flex: 1,
    fontFamily: 'PingFang HK',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 28,
    marginLeft: 10,
    color: '#2D2F33',
  },
  second_line: {
    width: 87,
    height: 98,
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 72,
    lineHeight: 98,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: -0.3,
    color: 'rgba(45, 47, 51, 1)',
    flex:1
  },
  third_line: {
    flex:1,
    width: 125,
    height: 25,
    fontFamily: 'PingFang HK',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 25,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: -0.3,

    /* Function ae */

    color: 'rgba(146, 146, 146, 1)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 88
  },
  nav_img: {
    position: 'absolute',
    width: 23.5,
    height: 17,
    left: 19
  },
  nav_title: {
    fontFamily: 'PingFang HK',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 28,
    /* identical to box height */
    
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: -0.3,
    
    /* Function 33 */
    
    color: '#2D2F33',    
  }
})

export default App
