import { KeyboardTabOutlined } from "@mui/icons-material";
import React, { useEffect, useState, useMemo, useCallback, } from "react";
import { AiOutlineUp as Arrow } from 'react-icons/ai';
import { CgExport as Export } from 'react-icons/cg';
import { BsBasket as Basket } from 'react-icons/bs';
import { MdOutlineAssignmentInd as Assign } from 'react-icons/md';
import { TbTruckReturn as Return } from 'react-icons/tb';


import { ImMagicWand as Magic } from 'react-icons/im';




import styles from "./customSplitButton.module.scss"

const SplitButton = (props) => {

    //STATES
    const [currentOption, setCurrentOption] = useState({})
    const [isUnfold, setIsUnfold] = useState(false);
    const [extendedOptionsList, setExtendedOptionsList] = useState([]);
    const [totalOptions, setTotalOptions] = useState(0); //Count variable of the total not disabled option
    const [selectedId, setSelectedId] = useState(0);
    const [validate, setValidate] = useState(false);
    const [width, setWidth] = useState("330px");



    const onClick = useCallback(() => {

    }, [])
    //options
    let mock = useMemo(() => [
        {
            id: 0,
            name: "Sauvegarder l'état actuel",
            icon: <Export />,
            onClick: (() => onClick()),
            validationMessage: 'Etes-vous sûr de vouloir sauvegarder cet état?',
            able: true,
            width: '320px',
        },
        {
            id: 1,
            name: 'Provoquer le destin',
            icon: <Magic />,
            able: true,
            width: '260px',
        },
        {
            id: 2,
            name: 'Exporter mon panier',
            icon: <Basket />,
             onClick: (() => onClick()),
            able: true,
            width: '280px',
        },
        {
            id: 3,
            name: 'Retourner produit',
            icon: <Return />,
             onClick: (() => onClick()),
            validationMessage: 'Etes-vous sûr de vouloir retourner ce produit?',
            able: true,
            width: '250px',
        },
        {
            id: 4,
            name: 'Assigner à un collaborateur',
            icon: <Assign />,
            onClick: () => onClick(),
            able: true,
            width: '340px',
        },
        {
            id: 5,
            name: 'option Z',
            icon: <Magic />, onClick: (() => onClick()),
            able: true,
            width: '200px',
        },
    ]);

    const isOptionAble = (option) => {
        let isAble = (option.able === 'true' || option.able === true)
        return isAble;
    }

    useEffect(() => {

        let temp = [];
        let longestNameLength = 0;
        for (let i = 0; i < mock.length; i++) {
            if (isOptionAble(mock[i])) {
                temp.push({ ...mock[i] })
            }
            const nameLength = mock[i].name.length
            if (longestNameLength < nameLength) {
                longestNameLength = nameLength;
            }
        }
        setExtendedOptionsList(temp);
        setTotalOptions(temp.length);
    }, [mock, selectedId])

    useEffect(() => {
        const finalWidth = (mock[selectedId].width).toString();
        setWidth(finalWidth);
    }, [isUnfold, mock, selectedId])

    const foldStyling = () => {
        let res = styles.fold;
        if (isUnfold) {
            res = styles.unfold
        }
        return res;
    }

    const renderIcon = (option) => {
        return (
            <>
                {(option.icon) &&
                    <div style={{paddingTop: '6px'}} className={styles.icon}>{option.icon}</div>              
                }
            </>
        )
    }

    return (
        <>
            {(typeof totalOptions !== 'undefined ' && totalOptions > 0) &&
                <div className={styles.container}>
                    {(totalOptions > 1) ?
                        <div className={styles.split}>
                            <>
                                <div className={[styles.buttonList, styles.top, foldStyling(), styles.button, styles.solo, styles.list].join(' ')}>
                                    <div style={{ width: width }} className={styles.option}
                                        onClick={() => {
                                            setIsUnfold(false);
                                            setSelectedId(parseInt(extendedOptionsList[selectedId].id));
                                        }}>
                                        {renderIcon(extendedOptionsList[selectedId])}
                                        <div className={styles.content}>{extendedOptionsList[selectedId].name}</div>
                                    </div>
                                </div>
                                {isUnfold &&
                                    <div style={{zIndex: 99}} className={[styles.buttonList, styles.buttonListing, styles.bottom, foldStyling()].join(' ')}>
                                        {extendedOptionsList.map((option, idx) => {
                                            if (parseInt(idx) !== parseInt(selectedId))
                                                return (
                                                    <>
                                                        <div style={{ width: width }} className={[styles.option, (idx == 0 ? styles.first : undefined)].join(' ')} key={'btn_' + idx}
                                                            onClick={() => {
                                                                setIsUnfold(false);
                                                                setSelectedId(parseInt(option.id));
                                                            }}
                                                        >
                                                            {renderIcon(option)}
                                                            <div className={styles.content}>{option.name}</div>
                                                        </div>
                                                    </>
                                                )
                                        })
                                        }
                                    </div>
                                }


                            </>
                            <div className={[styles.buttonArrow, styles.button, (!isUnfold ? styles.solo : undefined), styles.arrow].join(' ')}
                                onClick={() => {
                                    setIsUnfold(!isUnfold);
                                }}
                            >
                                <div className={styles.option}>
                                    <div className={[styles.content, (!isUnfold ? styles.reversed : undefined)].join(' ')}>
                                        <Arrow />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={[styles.buttonSolo, styles.button].join(' ')}>
                            <div className={styles.option}>
                                {renderIcon(extendedOptionsList[selectedId])}
                                <div className={styles.content}>{extendedOptionsList[selectedId].name}</div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    );
};

SplitButton.propTypes = {};

export default SplitButton;
