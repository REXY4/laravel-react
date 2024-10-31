import React, { ChangeEvent, Children, useRef, useState } from 'react';
import SortableTree, {
    TreeItem,
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

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

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
}

const LayoutFolderPrimary: React.FC<Props> = ({ data }) => {
    const [valueItem, setValueItem] = useState<string>('');
    const [saveParentId, setSaveParentId] = useState<string>('');
    const refDrag = useRef<any>(null);
    const [editData, setEditData] = useState<EditData>({
        edit: false,
        prevVal: '',
    });
    const [treeData, setTreeData] = useState<TreeItem[] | []>(data);

    const canDrag = ({ path }: any): boolean => {
        return path.length > 0;
    };

    const handleAdd = async (node: any, path: number[]) => {
        setSaveParentId(node.id);
        const newChild = {
            id: generateUniqueId,
            title: '',
            children: [],
        };
        if (!node.children) {
            console.log(node);
        } else {
            node.children.push(newChild);
        }

        const updatedTreeData = toggleExpandedForAll({
            treeData,
            expanded: true,
        });

        setTreeData(updatedTreeData);
    };

    const handleAddItem = (node: any) => {
        node.title = valueItem;
        setEditData({ edit: false, prevVal: '' });
        const updatedTreeData = toggleExpandedForAll({
            treeData,
            expanded: true,
        });
        let order = 0;
        if (node.children.length > 0) {
            order = node.children.length + 1;
        }
        const updateNewData: MenuRequest = {
            title: valueItem,
            dept: order,
            parent_id: saveParentId,
        };
        createMenu.mutate(updateNewData);
        setTreeData(updatedTreeData);
    };

    const createMenu = useMutation({
        mutationFn: MenuRepo.createMenu,
        onSuccess: () => {
            console.log('Post updated successfully');
        },
        onError: (error) => {
            console.error('Error updating post:', error);
        },
    });

    const deleteMenu = useMutation({
        mutationFn: MenuRepo.deleteMenu,
        onSuccess: () => {
            console.log('Post updated successfully');
        },
        onError: (error) => {
            console.error('Error updating post:', error);
        },
    });

    const updateMenu = useMutation({
        mutationFn: MenuRepo.updateMenu,
        onSuccess: () => {
            console.log('Post updated successfully');
        },
        onError: (error) => {
            console.error('Error updating post:', error);
        },
    });

    const handleEditData = (node: any) => {
        setSaveParentId(node.id);
        setEditData({ ...editData, edit: true, prevVal: node.title });
        node.title = '';
        const updateNewData: any = {
            title: valueItem,
            dept: node.dept,
            parent_id: node.parent_id,
        };
        const updatedTreeData = toggleExpandedForAll({
            treeData,
            expanded: true,
        });
        updateMenu.mutate(updateNewData);
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

    return (
        <div style={{ height: '100vh' }}>
            <SortableTree
                className="node-main"
                treeData={treeData}
                virtuosoRef={refDrag}
                onVisibilityToggle={(param) => {
                    console.log(param);
                }}
                onChange={(newTreeData) => setTreeData(newTreeData)}
                canDrag={canDrag}
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
                                            onClick={() => handleAddItem(node)}
                                            type="info"
                                        >
                                            +
                                        </ButtonRound>
                                    </div>
                                    <div className="ml-3">
                                        <ButtonRound
                                            onClick={() => handleCancel(node)}
                                            type="danger"
                                        >
                                            <Icon
                                                icon={'material-symbols:cancel'}
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
                                            onClick={() => handleEditData(node)}
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
                                            onClick={() => handleDelete(node)}
                                            type="danger"
                                        >
                                            <Icon
                                                icon={'material-symbols:delete'}
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
    );
};

export default LayoutFolderPrimary;
