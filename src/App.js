import React, { Component } from "react";

import { Row, Col, Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import styles from "./App.module.less";

const { userBasicInfo, projectExperience, educationExperience } =
  window.globalData;
class App extends Component {
  download = () => {
    html2canvas(this.refs.pdf, { scale: 2 }).then((canvas) => {
      //返回图片dataURL，参数：图片格式和清晰度(0-1)
      let pageData = canvas.toDataURL("image/jpeg", 1.0);

      let dims = {
        a2: [1190.55, 1683.78],
        a3: [841.89, 1190.55],
        a4: [595.28, 841.89],
      };
      //方向默认竖直，尺寸ponits，格式a2
      let pdf = new jsPDF("", "pt", "a4");

      let a4Width = dims["a4"][0];
      let a4Height = dims["a4"][1];

      let contentWidth = canvas.width,
        contentHeight = canvas.height;

      let pageHeight = (contentWidth / a4Width) * a4Height;
      let leftHeight = contentHeight;
      let position = 0;
      let imgWidth = a4Width,
        imgHeight = (a4Width / contentWidth) * contentHeight;

      if (leftHeight < pageHeight) {
        //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
        pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= a4Height;

          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }

      pdf.save("test.pdf");
    });
  };

  render() {
    return (
      <div>
        <div className={styles.top}>
          <Button type="primary" onClick={this.download}>
            下载
          </Button>
        </div>

        <div className={styles.App} ref="pdf">
          {/* 个人信息页 */}
          <div className={styles.page1} style={{ textAlign: "left" }}>
            <Row style={{ marginTop: 25 }}>
              <Col span={4}>
                <p style={{ fontSize: 28, margin: 0, fontWeight: "600" }}>
                  {userBasicInfo.name}
                </p>
              </Col>
              <Col span={10} style={{ textAlign: "left" }}>
                <p style={{ fontSize: 20, margin: 0 }}>
                  年龄: {userBasicInfo.age}
                </p>
                <p style={{ fontSize: 20, margin: 0 }}>
                  电话: {userBasicInfo.phone}
                </p>
              </Col>
              <Col span={10} style={{ textAlign: "left" }}>
                <p style={{ fontSize: 20, margin: 0 }}>
                  求职意向: {userBasicInfo.job}
                </p>
                <p style={{ fontSize: 20, margin: 0 }}>
                  邮箱: {userBasicInfo.email}
                </p>
              </Col>
            </Row>
            <Row style={{ marginTop: 25 }}>
              <div className={styles.line} />
            </Row>
            <Row style={{ marginTop: 35 }}>
              <div className={styles.titleBox}>
                <div className={styles.titleHeader}> 专业技能</div>
                <div className={styles.lineFlex}>
                  <div className={styles.lineBox}>
                    <span className={styles.square} />
                    <span className={styles.hline} />
                    <span className={styles.sline} />
                  </div>
                </div>
              </div>
              <Col span={20} offset={4} style={{ paddingLeft: 10 }}>
                <p className={styles.skill}>
                  5年 react /3年react native 开发经验:
                </p>
                <p className={styles.skillInfo}>
                  应用:react-redux
                  、reudx-saga、webpack、antdesign、lodash、graphql、axios、
                  tailwindcss，uncoss 等第三方库;
                </p>
                <p className={styles.skillInfo}>
                  flex
                  布局，组件化，性能优化,Typescript,eslint,husky,vite,webpack
                  等;
                </p>
                <p className={styles.skill}>4年 vue 开发经验:</p>
                <p className={styles.skillInfo}>
                
                  使用pinia，vue-router,element等;
                </p>
                <p className={styles.skill}>使用docker，docker-compose，部署mysql，redis，koajs服务、nginx等;</p>
                <p className={styles.skill}>
                   搭建公司npm命令，搭建UI组件和业务组件库，搭建项目，分配任务等
                </p>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <div className={styles.titleBox}>
                <div className={styles.titleHeader}> 工作景背</div>
                <div className={styles.lineFlex}>
                  <div className={styles.lineBox}>
                    <span className={styles.square} />
                    <span className={styles.hline} />
                    <span className={styles.sline} />
                  </div>
                </div>
              </div>
              {userBasicInfo.workExperience.map((work, i) => (
                <div className={styles.workExperience} key={i}>
                  <div className={`${styles.workInfo} `}>
                    <div className={styles.workYear}>{work.year}</div>
                    <div
                      className={`${styles.workCompany} ${styles.diamondBox}`}
                    >
                      <span className={styles.diamondIcon} /> {work.company}
                    </div>
                  </div>
                  <div className={styles.workDuty}>
                    {work.duty.map((w, j) => (
                      <p key={j}>{w}</p>
                    ))}
                  </div>
                </div>
              ))}
            </Row>
          </div>

          <div className={styles.page2}>
            <Row style={{ marginTop: 20, textAlign: "left" }}>
              <div className={styles.titleBox}>
                <div className={styles.titleHeader}> 项目经验</div>
                <div className={styles.lineFlex}>
                  <div className={styles.lineBox}>
                    <span className={styles.square} />
                    <span className={styles.hline} />
                    <span className={`${styles.sline} ${styles.highHeight}`} />
                  </div>
                </div>
              </div>
              {projectExperience.map((work, i) => (
                <div
                  className={styles.workExperience}
                  style={{ marginBottom: 15 }}
                  key={i}
                >
                  <div className={`${styles.workInfo} `}>
                    <div className={styles.workYear} />
                    <div
                      className={`${styles.workCompany} ${styles.diamondBox}`}
                    >
                      <span className={styles.diamondIcon} /> {work.pName}
                    </div>
                  </div>
                  <div className={styles.workDuty}>
                    <p>负责功能:</p>
                    {work.func.map((w, j) => (
                      <p className={styles.pSubinfo} key={j}>
                        {w}
                      </p>
                    ))}
                    <p>描述:</p>
                    {work.question.map((w, j) => (
                      <p className={styles.pSubinfo} key={j}>
                        {w}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </Row>
          </div>

          <div className={styles.page2}>
            <Row style={{ marginTop: 20, textAlign: "left" }}>
              <div className={styles.titleBox}>
                <div className={styles.titleHeader}> </div>
                <div className={styles.lineFlex}>
                  <div className={styles.lineBox}>
                    <span className={`${styles.sline} `} />
                  </div>
                </div>
              </div>
            </Row>
            <Row style={{ marginTop: 20, textAlign: "left" }}>
            <div
                className={styles.workExperience}
                style={{ marginBottom: 15 }}
              >
                <div className={`${styles.workInfo} `}>
                  <div className={styles.workYear} />
                  <div className={`${styles.workCompany} ${styles.diamondBox}`}>
                    <span className={styles.diamondIcon} /> ont一体机
                  </div>
                </div>
                <div className={styles.workDuty}>
                  <p>负责功能:</p>

                  <p className={styles.pSubinfo} >
                  整个项目的开发和维护，使用koajs开发服务端读取设备检验数据，vue开发客户端展示结果等
                  </p>
                  <p>描述:</p>
                  <p className={styles.pSubinfo}>
                  1、使用docker，docker-conpose实现在服务器和一体机命令部署和自动重启服务，部署redis和mysql、nginx，server端服务，
                  </p>
                  <p className={styles.pSubinfo}>
                  2、解决了nodejs中使用pdf，使用wkhtmltopdf库生成pdf，使用docker下载wkhtmltopdf，下载规定字体并导入一体机字体库中
                  </p>
                  <p className={styles.pSubinfo}>
                  3、volumes使容器和本地之前共享错误日志和输出日志，和数据持久化
                  </p>
                </div>
              </div>
              <div
                className={styles.workExperience}
                style={{ marginBottom: 15 }}
              >
                <div className={`${styles.workInfo} `}>
                  <div className={styles.workYear} />
                  <div className={`${styles.workCompany} ${styles.diamondBox}`}>
                    <span className={styles.diamondIcon} /> 小云鹤微信公众号
                  </div>
                </div>
                <div className={styles.workDuty}>
                  <p>负责功能:</p>

                  <p className={styles.pSubinfo} >
                  整个公众号的开发维护，使用了react，redux，react-loadable等
                  </p>
                  <p>描述:</p>
                  <p className={styles.pSubinfo}>
                  1、使用webpack4，antd-mobile，redux，axios搭建的框架，
                  </p>
                  <p className={styles.pSubinfo}>
                  2、使用react-loadable实现代码分割，
                  </p>
                  <p className={styles.pSubinfo}>
                  3、通过react-tiny-virtual-list来优化长列表，
                  </p>
                </div>
              </div>
              <div className={styles.titleBox}>
                <div className={styles.titleHeader}> 教育经历</div>
                <div className={styles.lineFlex}>
                  <div className={styles.lineBox}>
                    <span className={styles.square} />
                    <span className={styles.hline} />
                    <span className={`${styles.sline} `} />
                  </div>
                </div>
              </div>
              {educationExperience.map((work, i) => (
                <div
                  className={styles.workExperience}
                  style={{ marginBottom: 15 }}
                  key={i}
                >
                  <div className={`${styles.workInfo} `}>
                    <div className={styles.workYear}>{work.year}</div>
                    <div
                      className={`${styles.workCompany} ${styles.diamondBox}`}
                    >
                      <span className={styles.diamondIcon} /> {work.school}
                    </div>
                    <div className={`${styles.workCompany}`}>{work.major}</div>
                  </div>
                </div>
              ))}
            </Row>
            <Row style={{ marginTop: 20, textAlign: "left" }}>
              <div className={styles.titleBox}>
                <div className={styles.titleHeader}> 个人评价</div>
                <div className={styles.lineFlex}>
                  <div className={styles.lineBox}>
                    <span className={styles.square} />
                    <span className={styles.hline} />
                  </div>
                </div>
              </div>
              <div
                className={styles.workExperience}
                style={{ marginBottom: 15 }}
              >
                <div className={`${styles.workInfo} `}>
                  <div className={styles.workYear} />
                  <div className={`${styles.workCompany} `}>
                    <p>Github:https://github.com/weizheng1992</p>
                    <p>掘金:https://juejin.cn/user/2999123452376711</p>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
