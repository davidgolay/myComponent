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

    //options
    let mock = useMemo(() => [
        {
            id: 0,
            name: "Sauvegarder",
            icon: <Export />,
            onClick: (() => onClick()),
            able: true,
        },
        {
            id: 1,
            name: 'Provoquer',
            icon: <Magic />,
            able: true,
        },
        {
            id: 2,
            name: 'Exporter',
            icon: <Basket />,
            onClick: (() => onClick()),
            able: true,
        },
        {
            id: 3,
            name: 'Retourner',
            icon: <Return />,
            onClick: (() => onClick()),
            able: true,
        },
        {
            id: 4,
            name: 'Assigner',
            icon: <Assign />,
            onClick: () => onClick(),
            able: true,
        },
        {
            id: 5,
            name: 'optionZ',
            icon: <Magic />, onClick: (() => onClick()),
            able: true,
        },
    ], []);

    const isOptionAble = (option) => {
        let isAble = (option.able === 'true' || option.able === true)
        return isAble;
    }

    useEffect(() => {
        let temp = [];
        for (let i = 0; i < mock.length; i++) {
            if (isOptionAble(mock[i])) {
                temp.push({ ...mock[i] })
            }
        }
        setExtendedOptionsList(temp);
        setTotalOptions(temp.length);
    }, [mock, selectedId])

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
                    <div style={{ paddingTop: '6px' }} className={styles.icon}>{option.icon}</div>
                }
            </>
        )
    }

    const handleClick = (id) => {
        setIsUnfold(false);
        setSelectedId(parseInt(id));
    }

    return (
        <>
            {(typeof totalOptions !== 'undefined ' && totalOptions > 0) &&
                <div className={styles.container}>
                    {(totalOptions > 1) ?
                        //SPLITTED BUTTON
                        <div className={styles.split}>
                            <>
                                <div className={[styles.optionsContainer, foldStyling(), styles.top].join(' ')}>
                                    <div className={styles.option}
                                        onClick={() => { handleClick(extendedOptionsList[selectedId].id) }}>
                                        {renderIcon(extendedOptionsList[selectedId])}
                                        <div className={styles.content}>{extendedOptionsList[selectedId].name}</div>
                                    </div>
                                </div>
                                {/* //UNFOLDED LIST */}
                                {isUnfold &&
                                    <div className={[styles.optionsContainer, foldStyling(), styles.bottom, styles.listing,].join(' ')}>
                                        {extendedOptionsList.map((option, idx) => {
                                            if (parseInt(idx) !== parseInt(selectedId))
                                                return (
                                                    <React.Fragment key={'btn_' + idx}>
                                                        <div className={styles.option}
                                                            onClick={() => {
                                                                handleClick(parseInt(option.id));
                                                            }}
                                                        >
                                                            {renderIcon(option)}
                                                            <div className={styles.content}>{option.name}</div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                        })}
                                    </div>
                                }
                            </>
                            <div className={[styles.optionsContainer, styles.arrow].join(' ')}
                                onClick={() => { setIsUnfold(!isUnfold); }}
                            >
                                <div className={styles.option}>
                                    <div className={[styles.content, (!isUnfold ? styles.reversed : undefined)].join(' ')}>
                                        <Arrow />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        //BOUTON SOLO
                        <div className={styles.solo}>
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
