/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react'
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
  ImageBackground,
  PanResponder,
  Animated,
  useWindowDimensions,
  Easing,
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
import whiteBg from './image/whiteBg.png'
import array from './AppData'
const totalH = 266
const UserInfoDH = 256
const designTotalH = 894;
const titleDH = 64;
const UserInfoMarginTopDH = 18;
import {BoxShadow} from 'react-native-shadow' // 阴影
import LinearGradient from 'react-native-linear-gradient' // 渐变

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
    // console.log(evt) // 父组件告诉子组件，我被点击了
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
    color: '#000000',
    radius: 18,
    opacity: 0.15,
    border: 3,
    x: 0,
    y: 4,
  }
  let css = [styles.line_box, ...item.style]
  css.push(styles.line_box_hover)
  css.push({width: everyLineW + 3})
  css.push(item.hover)
  const [scale, setScale] = useState(new Animated.Value(1))
  // 模拟DidMount
  useEffect(() => {
    startAni(item)
  }, [])
  const startAni = item => {
    // console.log('startAni', props)
    Animated.timing(scale, {
      toValue: 1.05,
      duration: 300,
      delay: 0,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      // callback
    })
  }
  return (
    <Animated.View style={{transform: [{scale: scale}]}}>
      <BoxShadow setting={shadowOpt}>
        <LinearGradient colors={item.hoverColor} style={css}>
          <Text style={styles.score_box}>{item.y}</Text>
          <Image source={item.img} style={styles.face_box} />
        </LinearGradient>
      </BoxShadow>
    </Animated.View>
  )
}
class UnBoxShadowItem extends React.Component {
  constructor () {
    super()
    this.state = {
      height: new Animated.Value(65),
      opacity: new Animated.Value(0.2),
    }
  }
  componentDidMount () {
    const item = this.props.item
    const style = item.style
    if (!item.AnimatedFinish) {
      this.startAni()
    } else {
      this.setState({height: style[1].height})
      this.setState({opacity: 1})
    }
  }
  render () {
    const props = this.props
    const item = props.item
    const everyLineW = props.everyLineW

    return (
      <Animated.View
        style={[
          styles.line_box,
          ...item.style,
          {
            width: everyLineW,
            height: this.state.height,
            opacity: this.state.opacity,
          },
        ]}>
        <Text style={styles.score_box}>{item.y}</Text>
        <Image source={item.img} style={styles.face_box} />
      </Animated.View>
    )
  }

  startAni = () => {
    const props = this.props
    const item = props.item
    // console.log('startAni', props)
    Animated.parallel(
      [
        Animated.timing(this.state.height, {
          toValue: item.style[1].height,
          duration: 142 + 42 * (item.index + 1),
          delay: 8 * (item.index + 1),
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 42 * (item.index + 1),
          delay: 8 * item.index,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ],
      {
        stopTogether: false,
      },
    ).start(() => {
      // callback
      item.AnimatedFinish = true
    })
  }
}
function WeekDayText (props) {
  const item = props.item
  const day = props.day
  const clickIndex = props.clickIndex
  return (
    <Text style={item.day === day ? styles.week_day_color : ''}>{item.x}</Text>
  )
}
function WeekDayTextHover (props) {
  const item = props.item
  const day = props.day
  return (
    <ImageBackground source={whiteBg} style={[{width: 56, height: 56}]}>
      <Text
        style={[
          item.week_day_color_hover,
          {
            position: 'absolute',
            bottom: 22,
            left: '50%',
            transform: [{translateX: -8}],
          },
        ]}>
        {item.x}
      </Text>
    </ImageBackground>
  )
}
function Listitem (props) {
  // 声明一个叫 “count” 的 state 变量。
  const item = props.item
  // const refresh = props.refresh;
  const clickIndex = props.clickIndex
  let marginLeft = item.index === 0 ? 20 : 6;// 初始值
  let marginRight = item.index === (array.length - 1) ? 20 : 6;// 初始值
  marginLeft = item.clicked || clickIndex === item.index ? marginLeft - 6 : marginLeft
  marginRight = item.clicked || clickIndex === item.index ? marginRight - 6 : marginRight

  function curHandleClick (item) {
    props.handleClick(item)
  }
  const day = props.day
  return (
      <View
        style={[styles.week_box, {marginLeft: marginLeft}]}
        onTouchStart={e => undefined}
        onTouchMove={e => undefined}
        onTouchEnd={e => curHandleClick(item)}>
        {item.clicked || clickIndex === item.index ? (
          <BoxShadowItem item={item} everyLineW={props.everyLineW} />
        ) : (
          <UnBoxShadowItem item={item} everyLineW={props.everyLineW} />
        )}
        <View
          style={[
            styles.week_day,
            item.clicked || clickIndex === item.index
              ? ''
              : item.day === day
              ? styles.week_day_hover
              : '',
          ]}>
          {item.clicked || clickIndex === item.index ? (
            <WeekDayTextHover item={item} day={day} />
          ) : (
            <WeekDayText item={item} day={day} />
          )}
        </View>
      </View>
  )
}

function List (props) {
  const arraySrc = props.array
  let zhuH = props.zhuH;
  arraySrc.forEach((val, index) => {
    if (val.y < 50) {
      val.style = [styles.low, {height: (val.y / 100) * zhuH}]
      val.hoverColor = ['#CFCFCF', '#CFCFCF']
      val.hover = styles.hover_low
      val.week_day_color_hover = styles.week_day_color_hover_low
      val.img = question2x
    } else if (val.y < 90) {
      val.style = [styles.good, {height: (val.y / 100) * zhuH}]
      val.hoverColor = ['#42F373', '#A1FD44']
      val.hover = styles.hover_good
      val.week_day_color_hover = styles.week_day_color_hover_good
      val.img = greenFace2x
    } else {
      val.style = [styles.high, {height: (val.y / 100) * zhuH}]
      val.hoverColor = ['#FFA14A', '#FFCC4A']
      val.hover = styles.hover_high
      val.week_day_color_hover = styles.week_day_color_hover_high
      val.img = orangeFace2x
    }
    val.clicked = false
    val.index = index
  })
  const [array, setArray] = useState(arraySrc)
  // const [refresh, setRefresh] = useState(false);
  const [clickIndex, setClickIndex] = useState(-1)
  const handleClick = item => {
    // console.log('子元素传递过来的值为：', item) //子元素传递过来的值为：100
    item.clicked = true
    item.isInit = true
    setClickIndex(item.index)
    //resetArray(item)
  }
  const resetArray = item => {
    array[item.index] = item
    array.map(val => {
      val.clicked = false
    })
    setArray([...array]) // 没有响应式
  }

  let date = new Date()
  let day = date.getDay()

  const listItems = array.map(item => (
    <Listitem
      everyLineW={props.everyLineW}
      key={item.y.toString()}
      item={item}
      handleClick={handleClick}
      clickIndex={clickIndex}
      day={day}
    />
  ))
  return <View style={[styles.app]}>{listItems}</View>
}
function UserInfo (props) {
  const windowHeight = props.windowHeight
  const userH = props.userInfoH // 整个用户信息名片的高度
  // 分为上间距：43，头像：42，分数：98，标签：25，下间距：34
  const iconTopH = userH * (43 / UserInfoDH)
  const iconH = userH * (42 / UserInfoDH)
  const scoreH = userH * (98 / UserInfoDH)
  const scoreFontSize = userH * (72 / UserInfoDH)
  const labelH = userH * (25 / UserInfoDH)
  const marginTop = props.userMarginTop;
  console.log(marginTop)

  return (
    <ImageBackground source={base2x} style={[{width: '100%', height: userH, marginTop: marginTop}]}>
      <View style={[styles.user_info, {height: userH}]}>
        <View style={[styles.first_line, {marginTop: iconTopH}]}>
          <View style={styles.space}>
            <Image
              source={userIcon}
              style={[styles.user_icon, {height: iconH, width: iconH}]}
            />
          </View>
          <Text style={styles.user_name}>李强</Text>
        </View>
        <View
          style={[
          
            {height: scoreH, lineHeight: scoreH},
          ]}>
          <Text style={[styles.second_line,{ fontSize: scoreFontSize}]}>88</Text>
        </View>

        <Text style={[styles.third_line, {height: labelH, lineHeight: labelH}]}>
          周平均心情指数
        </Text>
      </View>
    </ImageBackground>
  )
}
function Nav (props) {
  return (
    <View style={[styles.nav,{height: props.titleH}]}>
      <Image source={Vector_28} style={styles.nav_img} />
      <Text style={styles.nav_title}>历史心情指数</Text>
    </View>
  )
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  const windowWidth = useWindowDimensions().width
  const windowHeight = useWindowDimensions().height
  
  const ratH = windowHeight/designTotalH;
  const zhuH = ratH * totalH;
  const userInfoH = ratH * UserInfoDH
  const userMarginTop = ratH * UserInfoMarginTopDH
  const jianbianH = ratH * 291;
  const titleH = ratH * titleDH ;
  const everyLineW = (windowWidth - 12*8 - 3*7) / 7;
  const statusBarHeight = StatusBar.currentHeight;
  const marginTop = userInfoH + titleH + 14 // 整个用户信息名片的高度 + 标题栏 + 状态栏

  // console.log(marginTop)
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="rgba(196, 196, 196, 0.15)"/>
        <LinearGradient colors={['rgba(196, 196, 196, 0.15)','rgba(196, 196, 196, 0)']} >
          <Nav titleH={titleH}/>
          <UserInfo windowHeight={windowHeight} userInfoH={userInfoH} windowWidth={windowWidth} userMarginTop={userMarginTop}/>
        </LinearGradient>
        <List array={array} everyLineW={everyLineW} zhuH={zhuH}/>
      <View style={[styles.line,{marginTop: marginTop}]}></View>
      <View style={[styles.line,{marginTop: marginTop + zhuH/2}]}></View>
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
    backgroundColor: 'transparent'
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
    backgroundColor: '#52C873',
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
    marginTop: 4,
    height: 288,
    marginBottom: 100,
    zIndex: 2,
    elevation: 2
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
    marginTop: 32,
    /* Function 33 */
  },
  week_day_hover: {
    width: 36,
    height: 36,
    backgroundColor: '#2D2F33',
    borderRadius: 8,
    /* cate green */
    color: 'white',
    marginTop: 18,
    top: 3,
  },
  week_day_color: {
    color: 'white',
  },
  week_day_color_hover_low: {
    borderRadius: 8,
    color: '#2D2F33',
  },
  week_day_color_hover_good: {
    borderRadius: 8,
    color: '#52C873',
    /* #F36A1B*/
  },
  week_day_color_hover_high: {
    borderRadius: 8,
    color: '#F36A1B',
    /* #F36A1B*/
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
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#F2F2F2',
  },
  hover_good: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#DCFFD6',
  },
  hover_high: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#FFE9D5',
  },

  user_info: {
   
    height: 399,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginLeft: 8,
    marginRight: 8

  },
  space: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  first_line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 44,
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
 
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 72,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: -0.3,
    color: 'rgba(45, 47, 51, 1)',
    flex: 1
  },
  third_line: {
    flex: 1,
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
    height: 68
  },
  nav_img: {
    position: 'absolute',
    width: 23.5,
    height: 17,
    left: 19,
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
  },
  line: {
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: '#F2F2F2',
    borderRadius: 16,
    left: 12,
    right: 12,
    zIndex: -5,
    elevation: -5,
    position: 'absolute',

  }
})

export default App
