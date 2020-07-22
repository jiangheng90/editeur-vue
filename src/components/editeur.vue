<template>
  <div :style="'width:' + width + ';height:' + height" id="editor-root" class="editor-root">
    <div id="toolbar" class="toolbar">
      <div class="button-wrap">
        <a-dropdown :trigger="['click']">
          <a-tooltip placement="top" title="字体大小" :get-popup-container="getPopupContainer">
            <button id="font-size" class="ant-dropdown-link hide-button-outline" @click="e => e.preventDefault()">
              <a-icon type="font-size" />
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item v-for="(size, index) in fontSizes" :key="index">
              <button class="font-item-button" @click="selectFontSize(size)">{{size}}pt</button>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']">
          <a-tooltip placement="top" title="字体颜色" :get-popup-container="getPopupContainer">
            <button id="font-color" :style="'color:' + color +';'" class="ant-dropdown-link hide-button-outline" @click="e => e.preventDefault()">
              <a-icon type="font-colors" />
            </button>
          </a-tooltip>
          <a-menu class="drop-content" slot="overlay">
            <a-menu-item style="padding: 3px" v-for="(color, index) in colors" :key="index">
              <button class="color-item-button" :style="'background-color:' + color" @click="selectFontColor(color)"></button>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']">
          <a-tooltip placement="top" title="背景颜色" :get-popup-container="getPopupContainer">
            <button id="background-color" :style="'color:' + backgroundColor +';'" class="ant-dropdown-link hide-button-outline" @click="e => e.preventDefault()">
              <a-icon type="highlight" />
            </button>
          </a-tooltip>
          <a-menu class="drop-content" slot="overlay">
            <a-menu-item style="padding: 3px" v-for="(color, index) in colors" :key="index">
              <button class="color-item-button" :style="'background-color:' + color" @click="selectBackgroundColor(color)"></button>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-tooltip placement="top" title="加粗" :get-popup-container="getPopupContainer">
          <button class="bold-button" id="bold" @click="setFontBold()">
            <strong><a-icon type="bold" /></strong>
          </button>
        </a-tooltip>
      </div>
      <div class="button-wrap">
        <a-tooltip placement="top" title="斜体" :get-popup-container="getPopupContainer">
          <button class="bold-button" id="italic" @click="setFontItalic()">
            <em><a-icon type="italic" /></em>
          </button>
        </a-tooltip>
      </div>
      <div class="button-wrap">
        <a-tooltip placement="top" title="删除线" :get-popup-container="getPopupContainer">
          <button class="bold-button" id="delete" @click="setFontDelete()">
            <s><a-icon type="strikethrough" /></s>
          </button>
        </a-tooltip>
      </div>
      <div class="button-wrap">
        <a-tooltip placement="top" title="下划线" :get-popup-container="getPopupContainer">
          <button class="bold-button" id="underScore" @click="setFontUnderScore()">
            <u><a-icon type="underline" /></u>
          </button>
        </a-tooltip>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']">
          <a-tooltip placement="top" title="无序列表" :get-popup-container="getPopupContainer">
            <button id="nosort-list" class="ant-dropdown-link hide-button-outline"
              @click="e => e.preventDefault()" icon="unordered-list">
              <a-icon type="unordered-list" />
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item v-for="(type, index) in noSortListItems" :key="index">
              <button class="font-item-button" @click="setNoSortList(type)">{{type}}</button>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']">
          <a-tooltip placement="top" title="有序列表" :get-popup-container="getPopupContainer">
            <button id="sort-list" class="ant-dropdown-link hide-button-outline"
              @click="e => e.preventDefault()" icon="unordered-list">
              <a-icon type="ordered-list" />
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item v-for="(item, index) in sortListItems" :key="index">
              <button class="font-item-button" @click="setSortList(item.type)">{{item.label}}</button>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']">
          <a-tooltip placement="top" title="居左" :get-popup-container="getPopupContainer">
            <button id="align" class="ant-dropdown-link hide-button-outline"
              @click="e => e.preventDefault()" icon="unordered-list">
              <a-icon :type=textAlign />
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item v-for="(align, index) in aligns" :key="index" @click="setAlign(align)">
              <a-tooltip placement="right" :title=align.label :get-popup-container="getPopupContainer">
                <button class="font-item-button">
                  <a-icon :type=align.icon />
                </button>
              </a-tooltip>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-tooltip placement="top" title="引用" :get-popup-container="getPopupContainer">
          <button class="bold-button" id="quote" @click="setQuote()">
            <a-icon type="retweet" />
          </button>
        </a-tooltip>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']" v-model="hyperLinkDialogVisible">
          <a-tooltip placement="top" title="超链接" :get-popup-container="getPopupContainer">
            <button id="hyper-link" class="ant-dropdown-link hide-button-outline"
              @click="setHyperLinkSelect()">
              <a-icon type="link" />
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-input v-model="href">
                <a-select slot="addonBefore" default-value="http://" style="width: 90px" @change="handleHrefSelectorChange">
                  <a-select-option value="http://">
                    http://
                  </a-select-option>
                  <a-select-option value="https://">
                    https://
                  </a-select-option>
                </a-select>
                <button slot="addonAfter" style="width: 30px" class="hide-button-outline" @click="setHyperLink">
                  <a-icon type="check"/>
                </button>
              </a-input>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']" v-model="imageDialogVisible">
          <a-tooltip placement="top" title="图片" :get-popup-container="getPopupContainer">
            <button id="image" class="ant-dropdown-link hide-button-outline"
              @click="setSelect()">
              <a-icon type="file-image"/>
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-input v-model="imageSrc">
                <button slot="addonAfter" style="width: 30px" class="hide-button-outline" @click="insertImage">
                  <a-icon type="check"/>
                </button>
              </a-input>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']" v-model="videoDialogVisible">
          <a-tooltip placement="top" title="视频" :get-popup-container="getPopupContainer">
            <button id="video" class="ant-dropdown-link hide-button-outline"
              @click="setSelect()">
              <a-icon type="video-camera" />
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-input v-model="videoSrc">
                <button slot="addonAfter" style="width: 30px" class="hide-button-outline" @click="insertVideo">
                  <a-icon type="check"/>
                </button>
              </a-input>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="button-wrap">
        <a-dropdown :trigger="['click']" v-model="audioDialogVisible">
          <a-tooltip placement="top" title="音频" :get-popup-container="getPopupContainer">
            <button id="audio" class="ant-dropdown-link hide-button-outline"
              @click="setSelect()">
              <a-icon type="audio" />
            </button>
          </a-tooltip>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-input v-model="audioSrc">
                <button slot="addonAfter" style="width: 30px" class="hide-button-outline" @click="insertAudio">
                  <a-icon type="check"/>
                </button>
              </a-input>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div id="content" class="editor-area"></div>
  </div>
</template>

<script>
import { ContentsNode, LineNode, ListItemNode, TextNode, TextNodeStyle, Editor, Selection, LineStyle, LineFormate, EmbedNode } from 'editeurjs'
let editor
export default {
  name: 'editeur',
  props: {
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {
      fontSize: '11pt',
      fontSizes: [9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 30, 36],
      color: false,
      backgroundColor: false,
      colors: ['#ffffff', '#000000', '#ff0000', '#ff7800', '#ffd900', '#a3e043', '#37d9f0', '#4da8ee', '#956fe7', 
               '#f3f3f4', '#cccccc', '#fef2f0', '#fef5e7', '#fefcd9', '#edf6e8', '#e6fafa', '#ebf4fc', '#f0edf6', 
               '#d7d8d9', '#a5a5a5', '#fbd4d0', '#ffd7b9', '#f9eda6', '#d4e9d6', '#c7e6ea', '#cce0f1', '#dad5e9', 
               '#7b7f83', '#494949', '#ee7976', '#faa573', '#e6b322', '#98c091', '#79c6cd', '#6eaad7', '#9c8ec1', 
               '#41464b', '#333333', '#be1a1d', '#b95514', '#ad720e', '#1c7231', '#1c7892', '#19439c', '#511b78'
               ],
      boldButtonId: ['bold', 'italic', 'delete', 'underScore'],
      dropDownButtonId: ['font-size', 'font-color', 'background-color', 'nosort-list', 'sort-list'],
      noSortListItems: ['none', 'circle', 'square'],
      sortListItems: [
        {
          label: 'none',
          type: 'none'
        },
        {
          label: '123',
          type: 'decimal'
        },
        {
          label: 'i,ii,iii',
          type: 'lower-roman'
        },
        {
          label: 'a,b,c',
          type: 'lower-latin'
        }
      ],
      textAlign: 'align-left',
      aligns: [
        {
          icon: 'align-left',
          type: 'left',
          label: '居左'
        },
        {
          icon: 'align-center',
          type: 'center',
          label: '居中'
        },
        {
          icon: 'align-right',
          type: 'right',
          label: '居右'
        }
      ],
      hyperLinkDialogVisible: false,
      imageDialogVisible: false,
      videoDialogVisible: false,
      audioDialogVisible: false,
      href: '',
      imageSrc: '',
      videoSrc: '',
      audioSrc: '',
      affix: 'http://',
      select: undefined
    }
  },
  methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    selectFontSize (e) {
      const val = e
      this.fontSize = e + 'pt'
      editor.SetFontSize(val, 1)
    },
    selectFontColor (e) {
      const val = e
      this.color = e
      editor.SetFontColor(val)
    },
    selectBackgroundColor (e) {
      const val = e
      this.backgroundColor = e
      editor.SetBackgroundColor(val)
    },
    setFontBold () {
      editor.SetBold()
      const bold = document.getElementById('bold')
      if (bold) {
        bold.style.backgroundColor =
          bold.style.backgroundColor === '#d4d4d4'
            ? '#ffffff'
            : '#d4d4d4'
      }
    },
    setFontItalic () {
      editor.SetItalic()
      const italic = document.getElementById('italic')
      if (italic) {
        italic.style.backgroundColor =
        italic.style.backgroundColor === '#d4d4d4'
            ? '#ffffff'
            : '#d4d4d4'
      }
    },
    setFontDelete () {
      editor.SetDelete()
      const del = document.getElementById('delete')
      if (del) {
        del.style.backgroundColor =
        del.style.backgroundColor === '#d4d4d4'
            ? '#ffffff'
            : '#d4d4d4'
      }
    },
    setFontUnderScore () {
      editor.SetUnderScore()
      const underScore = document.getElementById('underScore')
      if (underScore) {
        underScore.style.backgroundColor =
        underScore.style.backgroundColor === '#d4d4d4'
            ? '#ffffff'
            : '#d4d4d4'
      }
    },
    setNoSortList (e) {
      const val = e
      let param
      const symbol = val === 'none' ? undefined : val
      if (symbol) {
        param = {
          list: true,
          type: 0,
          symbol: symbol
        }
      } else {
        param = {
          list: false
        }
      }
      editor.SetList(param)
    },
    setSortList (e) {
      const val = e
      let param
      const symbol = val === 'none' ? undefined : val
      if (symbol) {
        param = {
          list: true,
          type: 1,
          symbol: symbol
        }
      } else {
        param = {
          list: false
        }
      }
      editor.SetList(param)
    },
    setAlign (val) {
      const align = new LineStyle()
      align.SetTextAlign(val.type)
      editor.SetAlign(align)
      this.textAlign = val.icon
    },
    setQuote () {
      const style = new LineStyle()
      style.borderLeft = '5px solid #f0f0f0'
      style.color = '#a5a5a5'
      style.backgroundColor = '#f9f9f9'
      style.padding = '5px 0 5px 10px'
      const formate = new LineFormate('div')
      formate.style = style
      editor.SetLineStyle(formate)
    },
    setHyperLinkSelect () {
      editor.SetFontColor('#1890ff')
      setTimeout(() => {
        this.select = new Selection()
      }, 0);
    },
    setSelect () {
      this.select = new Selection()
    },
    setHyperLink () {
      if (this.href.length > 0) {
        const val = this.affix + this.href
        editor.SetHyperLink(val, this.select)
        this.href = ''
        this.affix = 'http://'
      }
      this.hyperLinkDialogVisible = false
      this.select = undefined
    },
    insertImage () {
      if (this.imageSrc.length > 0) {
        const embed = new EmbedNode()
        embed.src = this.imageSrc
        embed.type = 'image/jpg'
        editor.InsertEmbedElement(embed, this.select)
      }
      this.select = undefined
      this.imageSrc = ''
      this.imageDialogVisible = false
    },
    insertVideo () {
      if (this.videoSrc.length > 0) {
        const embed = new EmbedNode()
        embed.src = this.videoSrc
        embed.type = 'video/mp4'
        editor.InsertEmbedElement(embed, this.select)
      }
      this.select = undefined
      this.videoSrc = ''
      this.videoDialogVisible = false
    },
    insertAudio () {
      if (this.audioSrc.length > 0) {
        const embed = new EmbedNode()
        embed.src = this.audioSrc
        embed.type = 'audio/mpeg'
        editor.InsertEmbedElement(embed, this.select)
      }
      this.select = undefined
      this.audioSrc = ''
      this.audioDialogVisible = false
    },
    handleHrefSelectorChange (val) {
      this.affix = val
    },
    handleMouseUp () {
      this.boldButtonId.map((id) => {
        const target = document.getElementById(id)
        if (target) {
          if (new Selection().isSelection()) {
            const is = !editor.textState[target.firstChild.tagName.toLowerCase()]
            if (is) {
              target.style.backgroundColor = '#d4d4d4'
              target.className = 'bold-button button-enter'
            }
          } else {
            target.style.backgroundColor = '#ffffff'
            target.className = 'bold-button button-leave'
          }
        }
      })
    },
    handleNormalButtonMouseEnter (val) {
      const target = document.getElementById(val)
      if (target) {
        target.style.backgroundColor = '#d4d4d4'
        target.style.cursor = 'pointer'
        target.className = 'bold-button button-enter'
      }
    },
    handleNormalButtonMouseLeave (val) {
      const target = document.getElementById(val)
      const is = editor.textState[target.firstChild.tagName.toLowerCase()]
      if (target && is) {
        target.style.backgroundColor = '#ffffff'
        target.className = 'bold-button button-leave'
      }
    },
    handleDropDownButtonMouseEnter (val) {
      const target = document.getElementById(val)
      if (target) {
        target.style.backgroundColor = '#d4d4d4'
        target.className = 'hide-button-outline button-enter'
      }
    },
    handleDropDownButtonMouseLeave (val) {
      const target = document.getElementById(val)
      if (target) {
        target.style.backgroundColor = '#ffffff'
        target.className = 'hide-button-outline button-leave'
      }
    },
    setEditAreaHeight () {
      const root = document.getElementById('editor-root')
      const toolbar = document.getElementById('toolbar')
      const editArea = document.getElementById('content')
      editArea.style.height = (root.clientHeight - toolbar.clientHeight) + 'px'
    }
  },
  mounted () {
    const target = document.getElementById('content')

    editor = new Editor(target)

    window.addEventListener('mouseup', () => {
      this.handleMouseUp()
    })

    window.addEventListener('resize', () => {
      this.setEditAreaHeight()
    })

    this.setEditAreaHeight()
  }
}
</script>

<style scoped lang="scss">
  @import '../style/editeur.scss'
</style>
