import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

function AnimatedCicle(props) {
  const sizeContainer = props.size ?? 600;
  const itensMiniCicle = props.miniItems;
  const circleSize = useRef("");
  const [screenInformation, setScreenInformation] = useState({
    size: { width: 0, height: 0 },
    scroll: 0,
  });

  const CirculoAnimadoStyles = {
    width: "90vw",
    maxWidth: sizeContainer,
    height: "90vw",
    maxHeight: sizeContainer,
  };

  const handleScreenInformation = () => {
    setScreenInformation({
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      scroll: window.scrollY,
    });
  };

  useEffect(() => {
    handleScreenInformation();
    window.addEventListener("scroll", handleScreenInformation);
    window.addEventListener("resize", handleScreenInformation);
    return () => {
      window.removeEventListener("scroll", handleScreenInformation);
      window.removeEventListener("resize", handleScreenInformation);
    };
  }, []);

  return (
    <div
      className="circulo-animado"
      style={CirculoAnimadoStyles}
      ref={circleSize}
    >
      <div className="circulo-central"></div>
      {itensMiniCicle?.map((item, index, arr) => (
        <MiniCiclesContent
          key={index}
          index={index}
          length={arr.length}
          item={item}
          sizeCircle={circleSize.current.clientWidth}
          screenInformation={screenInformation}
          {...props}
        ></MiniCiclesContent>
      ))}
    </div>
  );
}

const MiniCiclesContent = (props) => {
  const [
    length,
    maxDeg,
    size,
    initialDeg,
    screenInformation,
    menuStaticActive,
    handleMenu,
  ] = [
    props.length,
    props.maxDeg ?? 360,
    props.sizeCircle,
    props.initialDeg ?? 0,
    props.screenInformation,
    props.menuStatic,
    props.menuMobileStatus,
  ];

  const deg = (maxDeg / length) * props.index + initialDeg;
  const activeMenuInteraction = deg < 0 && menuStaticActive;

  const getActualPage = Math.round(
    screenInformation.scroll / screenInformation.size.height
  );
  const validateActualPage =
    getActualPage === length - props.index - 1 && getActualPage > 0;

  const leftForBigScreen =
    screenInformation.size.width >= 1440
      ? (screenInformation.size.width - 1440) / 2 + "px"
      : 0;
  const handleMobile = screenInformation.size.width <= 1200;
  const styles = {
    ForStatic: {
      left: `calc(50% - ${size / 2}px)`,
      transform: `rotate(${deg}deg)`,
      transformOrigin: `${size / 2}px`,
    },
    ForMenu: handleMobile
      ? handleMenu
        ? {
            top: `calc(60% - ${70 * props.index}px)`,
            left: "0px",
            width: "100vw",
          }
        : {
            left: "-100%",
          }
      : validateActualPage
      ? {
          top: "50px",
          width: "400px",
          left: leftForBigScreen,
        }
      : {
          top: `calc(60% - ${70 * props.index}px)`,
          left: leftForBigScreen,
        },
  };

  const validateMenuActivation = (param1, param2) => {
    if (activeMenuInteraction) {
      return param1;
    } else {
      return param2;
    }
  };

  return (
    <div
      className={`circulos-mini menu-for-mobile mini-circulos-${validateMenuActivation(
        "menu",
        "static"
      )}`}
      style={validateMenuActivation(styles.ForMenu, styles.ForStatic)}
    >
      <div
        className="circulos-mini-content"
        style={{
          transform: `rotate(-${validateMenuActivation(0, deg)}deg)`,
        }}
      >
        <h2>{props.item?.icon}</h2>
        <h1
          className={`text-for-menu`}
          style={{
            display: validateActualPage || handleMenu ? "flex" : "none",
          }}
        >
          {props.item?.text?.toUpperCase()}
        </h1>
      </div>
    </div>
  );
};

export default AnimatedCicle;
