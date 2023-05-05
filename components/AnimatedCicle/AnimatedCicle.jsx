import React, { useState, useEffect, useRef } from "react";

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
    Yposition,
  ] = [
    props.length,
    props.maxDeg ?? 360,
    props.sizeCircle,
    props.initialDeg ?? 0,
    props.screenInformation,
    props.menuStatic,
    props.menuMobileStatus,
    props.Yposition ?? [0, 0, 0],
  ];

  const deg = (maxDeg / length) * props.index + initialDeg;
  const activeMenuInteraction = deg < 0 && menuStaticActive;

  const [getActualPage, SetgetActualPage] = useState(3);
  useEffect(() => {
    if (activeMenuInteraction) {
      if (
        Yposition[0] <= screenInformation.scroll + 300 &&
        screenInformation.scroll + 300 <= Yposition[1]
      ) {
        SetgetActualPage(2);
      } else if (
        Yposition[1] <= screenInformation.scroll + 300 &&
        screenInformation.scroll + 300 <= Yposition[2]
      ) {
        SetgetActualPage(1);
      } else if (screenInformation.scroll + 300 >= Yposition[2]) {
        SetgetActualPage(0);
      } else {
        SetgetActualPage(3);
      }
    }
  }, [screenInformation.scroll]);

  const validateActualPage =
    getActualPage === props.index && getActualPage != 3;

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
    ForMenu: validateActualPage
      ? {
          bottom: "none",
          width: "100%",
          maxWidth: "400px",
          height: "75px",
          transition: "1s",
          left: leftForBigScreen,
          right: "none",
          top: "50px",
        }
      : handleMobile
      ? {
          width: "25%",
          height: "50px",
          right: `calc( 25% * ${props.index} )`,
          bottom: "0px",
          transition: "0.5s",
        }
      : {
          top: `calc(60% - ${100 * props.index}px)`,
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
      className={`circulos-mini mini-circulos-${validateMenuActivation(
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
