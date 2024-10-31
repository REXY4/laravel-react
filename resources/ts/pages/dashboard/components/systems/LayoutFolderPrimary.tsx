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

const LayoutFolderPrimary: React.FC = () => {
    const [valueItem, setValueItem] = useState<string>('');
    const refDrag = useRef<any>(null);
    const [editData, setEditData] = useState<EditData>({
        edit: false,
        prevVal: '',
    });
    const [treeData, setTreeData] = useState<TreeItem[]>([
        {
            id: generateUniqueId(), // Assign an ID to the root node
            title: 'system management',
            children: [
                {
                    id: generateUniqueId(),
                    title: 'System Management',
                    children: [
                        {
                            id: generateUniqueId(),
                            title: 'Systems',
                            children: [
                                {
                                    id: generateUniqueId(),
                                    title: 'System Code',
                                    children: [
                                        {
                                            id: generateUniqueId(),
                                            title: 'Code Registration',
                                        },
                                        {
                                            id: generateUniqueId(),
                                            title: 'Code Registration - 2',
                                        },
                                        {
                                            id: generateUniqueId(),
                                            title: 'Properties',
                                        },
                                    ],
                                },
                                {
                                    id: generateUniqueId(),
                                    title: 'Menus',
                                    children: [
                                        {
                                            id: generateUniqueId(),
                                            title: 'Menu Registration',
                                        },
                                    ],
                                },
                                {
                                    id: generateUniqueId(),
                                    title: 'API List',
                                    children: [
                                        {
                                            id: generateUniqueId(),
                                            title: 'API Registration',
                                        },
                                        {
                                            id: generateUniqueId(),
                                            title: 'API Edit',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: generateUniqueId(),
                            title: 'Users & Groups',
                            children: [
                                {
                                    id: generateUniqueId(),
                                    title: 'Users',
                                    children: [
                                        {
                                            id: generateUniqueId(),
                                            title: 'User Account Registration',
                                        },
                                    ],
                                },
                                {
                                    id: generateUniqueId(),
                                    title: 'Groups',
                                    children: [
                                        {
                                            id: generateUniqueId(),
                                            title: 'User Group Registration',
                                        },
                                    ],
                                },
                                {
                                    id: generateUniqueId(),
                                    title: '사용자 승인',
                                }, // "User Approval" in Korean
                                {
                                    id: generateUniqueId(),
                                    title: '사용자 승인 상세',
                                }, // "User Approval Detail" in Korean
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    const canDrag = ({ path }: any): boolean => {
        return path.length > 0;
    };

    const handleAdd = async (node: any, path: number[]) => {
        const newChild = {
            id: generateUniqueId(),
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
        setTreeData(updatedTreeData);
    };

    const handleEditData = (node: any) => {
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
