import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import SortableTree, {
    TreeItem,
    getDepth,
    toggleExpandedForAll,
} from '@nosferatu500/react-sortable-tree';
import 'react-sortable-tree/style.css'; // Import default styles
import './CustomTreeStyles.css'; // Custom CSS file for additional styles
import ButtonRound from '../../../../componets/buttons/ButtonRound';
import Input from '../../../../componets/inputs/input';
import { Icon } from '@iconify/react';
import { MenuInterface, MenuRequest } from '../../../../types/MenuTypes';
import { useMutation } from '@tanstack/react-query';
import MenuRepo from '../../../../repo/menus.repo';
import Select from '../../../../componets/inputs/select';
import Button from '../../../../componets/buttons/button';

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

interface DragAnDrop {
    isDragging: boolean;
    draggedNode: any;
}

const findGroupTitle = (data: any, targetTitle: any) => {
    for (const item of data) {
        if (item.title === targetTitle) {
            return item;
        }
        if (item.children) {
            const result: any = findGroupTitle(item.children, targetTitle);
            if (result) return result;
        }
    }
    return null; // Jika tidak ditemukan
};

interface CanDropParams {
    node: any;
    prevPath: number[];
    prevParent: any;
    prevTreeIndex: number;
    nextPath: number[];
    nextParent: any;
    nextTreeIndex: number;
}

const deleteItemByTitle = (data: any, targetTitle: any) => {
    return data
        .map((item: any) => {
            if (item.children) {
                // Panggil rekursif pada children
                item.children = deleteItemByTitle(item.children, targetTitle);
            }
            return item;
        })
        .filter((item: any) => item.id !== targetTitle); // Filter untuk menghapus item dengan title yang cocok
};

interface EditData {
    edit: boolean;
    prevVal: string;
}

interface Props {
    data: Array<MenuInterface>;
    isLoading: boolean;
    refresh: any;
}

const LayoutFolderPrimary: React.FC<Props> = ({ data, isLoading, refresh }) => {
    const [delCon, setDelCon] = useState<boolean>(false);
    const [valueItem, setValueItem] = useState<string>('');
    const [saveParentId, setSaveParentId] = useState<string>('');
    const [saveParentData, setSaveParentData] = useState<any>();
    const [conDrag, setConDrag] = useState<boolean>(false);
    const [buttonExpand, setButtonExpand] = useState<boolean>(true);

    const refDrag = useRef<any>(null);
    const refDrag2 = useRef<any>(null);
    const [editData, setEditData] = useState<EditData>({
        edit: false,
        prevVal: '',
    });
    const [treeData, setTreeData] = useState<TreeItem[] | []>(data);
    const canDrag = (param: any): boolean => {
        // refDrag2.current = param.parentNode;
        return param.path.length > 0;
    };

    useEffect(() => {
        setTreeData(data);
    }, [data]);

    const handleAdd = async (node: any, path: number[]) => {
        setSaveParentId(node.id);
        setSaveParentData(node);
        setEditData({ edit: false, prevVal: '' });
        const newChild = {
            id: generateUniqueId,
            title: '',
            depth: getDepth(node),
            children: [],
        };
        if (!node.children) {
            node.children.push(newChild);
        } else {
            node.children.push(newChild);
        }
        const updatedTreeData = toggleExpandedForAll({
            treeData,
            expanded: true,
        });
        setTreeData(updatedTreeData);
    };

    const handleButtonExpand = (expand: boolean) => {
        setButtonExpand(!buttonExpand);
        const updateDataTree = toggleExpandedForAll({
            treeData,
            expanded: expand,
        });
        setTreeData(updateDataTree);
    };

    const handleAddItem = (node: any) => {
        node.title = valueItem;
        const updatedTreeData = toggleExpandedForAll({
            treeData,
            expanded: true,
        });
        let order = 1;
        if (saveParentData.children !== undefined) {
            order = saveParentData.children.length;
        }
        if (editData.edit) {
            const updateNewData: any = {
                id: node.id,
                title: valueItem,
                depth: node.depth,
                parent_id: node.parent_id,
            };
            updateMenu.mutate(updateNewData);
        } else {
            const updateNewData: MenuRequest = {
                title: valueItem,
                depth: order,
                parent_id: saveParentId,
            };
            createMenu.mutate(updateNewData);
        }
        setTreeData(updatedTreeData);
    };

    const createMenu = useMutation({
        mutationFn: MenuRepo.createMenu,
        onSuccess: () => {
            //  console.log('Post updated successfully');
        },
        onError: (error) => {
            //  console.error('Error updating post:', error);
        },
    });

    const deleteMenu = useMutation({
        mutationFn: MenuRepo.deleteMenu,
        onSuccess: () => {
            refresh();
            //   console.log('Post updated successfully');
        },
        onError: (error) => {
            //  console.error('Error updating post:', error);
        },
    });

    const updateMenu = useMutation({
        mutationFn: MenuRepo.updateMenu,
        onSuccess: () => {
            //  console.log('Post updated successfully');
        },
        onError: (error) => {
            //  console.error('Error updating post:', error);
        },
    });

    const handleEditData = (node: any) => {
        setSaveParentId(node.id);
        setEditData({ ...editData, edit: true, prevVal: node.title });
        node.title = '';
        const updatedTreeData = toggleExpandedForAll({
            treeData,
            expanded: true,
        });
        setTreeData(updatedTreeData);
    };

    const handleDelete = (node: any) => {
        const updateData = deleteItemByTitle(treeData, node.id);
        deleteMenu.mutate(node.id);
        setTreeData(updateData);
    };

    const handleCancel = (node: any) => {
        if (editData.edit) {
            node.title = editData.prevVal;
            const updatedTreeData = toggleExpandedForAll({
                treeData,
                expanded: true,
            });
            setTreeData(updatedTreeData);
        } else {
            const updateData = deleteItemByTitle(treeData, node.id);
            setTreeData(updateData);
        }
    };

    const getDataDrop = (param: CanDropParams) => {
        refDrag.current = param;
        // if (!checkDrag || checkDrag.node.id !== param.node.id) {
        //     setCheckDrag(param);
        // }
        // if (conDrag) {
        //     setCheckDrag(param);
        // }
    };

    useEffect(() => {
        if (conDrag) {
            if (refDrag.current.nextParent !== undefined) {
                const filterDeepth = refDrag.current.nextParent.children.find(
                    (item: any) => item.depth == refDrag.current.nextTreeIndex
                );
                const updateData = {
                    ...filterDeepth,
                    depth: refDrag.current.prevTreeIndex,
                };
                updateMenu.mutate(updateData);
            }
            const updateData = {
                id: refDrag.current.node.id,
                title: refDrag.current.node.title,
                depth: refDrag.current.nextTreeIndex,
                parent_id: refDrag.current.nextParent
                    ? refDrag.current.nextParent.id
                    : '',
            };
            updateMenu.mutate(updateData);
            setConDrag(false);
        }
    }, [conDrag]);
    return (
        <>
            <div className="w-[50%]">
                <Select
                    variant="secondary"
                    name="menu"
                    options={[
                        {
                            label: 'System Management',
                            value: 'System Management',
                        },
                    ]}
                    label="Menu"
                />
            </div>
            <div className="flex mt-[48px]">
                <div className="w-[133px] mr-[8px]">
                    <ButtonRound
                        onClick={() => handleButtonExpand(true)}
                        type={buttonExpand ? 'light' : 'secondary'}
                    >
                        Expand All
                    </ButtonRound>
                </div>
                <div className="w-[133px]">
                    <ButtonRound
                        onClick={() => handleButtonExpand(false)}
                        type={!buttonExpand ? 'light' : 'secondary'}
                    >
                        Collapse All
                    </ButtonRound>
                </div>
            </div>

            <div className="mt-10" style={{ height: '100vh' }}>
                <SortableTree
                    className="node-main"
                    treeData={treeData}
                    // virtuosoRef={refDrag}
                    canDrop={(param: CanDropParams) => {
                        getDataDrop(param);
                        return true;
                    }}
                    onDragStateChanged={(param: DragAnDrop) => {
                        setConDrag(!param.isDragging);
                        // setConDrag(param.isDragging);
                    }}
                    onChange={(newTreeData) => setTreeData(newTreeData)}
                    canDrag={(param: any) => canDrag(param)}
                    generateNodeProps={({ node, path }) => ({
                        title: (
                            <div className="custom-node">
                                {node.title == '' ? (
                                    <div
                                        className="flex"
                                        style={{
                                            zIndex: 500,
                                            position: 'absolute',
                                        }}
                                    >
                                        <Input
                                            type="text"
                                            name="title"
                                            onChange={(
                                                val: ChangeEvent<HTMLInputElement>
                                            ) => setValueItem(val.target.value)}
                                        />
                                        <div className="ml-3">
                                            <ButtonRound
                                                onClick={() =>
                                                    handleAddItem(node)
                                                }
                                                type="info"
                                            >
                                                +
                                            </ButtonRound>
                                        </div>
                                        <div className="ml-3">
                                            <ButtonRound
                                                onClick={() =>
                                                    handleCancel(node)
                                                }
                                                type="danger"
                                            >
                                                <Icon
                                                    icon={
                                                        'material-symbols:cancel'
                                                    }
                                                    width={24}
                                                    height={24}
                                                />
                                            </ButtonRound>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <span>{node.title}</span>
                                        <div className="button-plus">
                                            <ButtonRound
                                                onClick={() =>
                                                    handleAdd(node, path)
                                                }
                                                type="info"
                                            >
                                                +
                                            </ButtonRound>
                                        </div>
                                        <div className="button-plus">
                                            <ButtonRound
                                                onClick={() =>
                                                    handleEditData(node)
                                                }
                                                type="secondary"
                                            >
                                                <Icon
                                                    icon={'ic:baseline-edit'}
                                                    width={14}
                                                    height={14}
                                                />
                                            </ButtonRound>
                                        </div>
                                        <div className="button-plus">
                                            <ButtonRound
                                                onClick={() =>
                                                    handleDelete(node)
                                                }
                                                type="danger"
                                            >
                                                <Icon
                                                    icon={
                                                        'material-symbols:delete'
                                                    }
                                                    width={14}
                                                    height={14}
                                                />
                                            </ButtonRound>
                                        </div>
                                    </>
                                )}
                            </div>
                        ),
                    })}
                />
            </div>
        </>
    );
};

export default LayoutFolderPrimary;
