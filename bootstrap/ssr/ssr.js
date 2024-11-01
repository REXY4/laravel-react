import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from "react";
import SortableTree, { getDepth, toggleExpandedForAll } from "@nosferatu500/react-sortable-tree";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import RelationGraph from "relation-graph-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function Welcome() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: "Hallo World" }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
const ButtonRound = ({
  type = "primary",
  children,
  onClick,
  ...props
}) => {
  const buttonTypes = {
    primary: "bg-[#253BFF] hover:bg-[#253BFF] text-white w-full rounded-[20px]",
    secondary: "bg-[#1D2939] hover:bg-[#1D2939] text-white w-full rounded-[20px]",
    success: "bg-green-500 hover:bg-green-700 text-white w-full rounded-[20px]",
    danger: "bg-red-500 hover:bg-red-700 text-white w-full rounded-[20px]",
    warning: "bg-yellow-500 hover:bg-yellow-700 text-white w-full rounded-[20px]",
    info: "bg-[#253BFF] hover:bg-[#253BFF]-700 text-white w-full rounded-[20px]",
    light: "bg-gray-200 hover:bg-gray-300 text-gray-800 w-full rounded-[20px]",
    dark: "bg-black hover:bg-gray-800 text-white w-full rounded-[20px]"
  };
  const buttonClass = `${buttonTypes[type]} font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;
  return /* @__PURE__ */ jsx("button", { className: buttonClass, onClick, ...props, children });
};
const Input = ({
  label,
  type = "text",
  variant = "primary",
  placeholder,
  value,
  onChange,
  name,
  required = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const variantClasses = {
    primary: "border-blue-500 focus:ring-blue-500",
    secondary: "border-gray-300 focus:ring-gray-500",
    success: "border-gray-100 bg-gray focus:ring-[#1D2939] rounded-[20px]",
    danger: "border-red-500 focus:ring-red-500"
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold  mb-1 text-gray-700 capitalize", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name,
          autoComplete: "false",
          type: type === "password" ? showPassword ? "text" : "password" : type,
          className: `block w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${variantClasses[variant]}`,
          placeholder,
          value,
          onChange,
          required
        }
      ),
      type === "password" && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-y-0 right-0 flex items-center pr-3",
          onClick: togglePasswordVisibility,
          children: showPassword ? /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-5 w-5 text-gray-600",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13.875 18.825A5.968 5.968 0 0012 19a5.968 5.968 0 00-1.875-.175m3.75-1.5A5.968 5.968 0 0012 15a5.968 5.968 0 00-1.875.175m3.75-1.5A5.968 5.968 0 0012 11a5.968 5.968 0 00-1.875.175m3.75-1.5A5.968 5.968 0 0012 7a5.968 5.968 0 00-1.875.175M3.42 6.58C1.48 8.12.01 11.04.01 12c0 1.76 1.25 3.58 3.42 4.58m15.16 0C22.48 15.58 24 13.76 24 12c0-1.96-1.48-3.88-3.42-4.58M10.5 12c0 .28-.03.55-.1.82M4.28 3.72A12.029 12.029 0 0012 4c3.73 0 7.12 1.28 9.65 3.44C22.6 9.24 23 10.62 23 12c0 1.38-.4 2.76-1.35 4.56m-1.17-1.2A8.962 8.962 0 0112 20c-2.67 0-5.1-.88-7.15-2.36M8.65 12c0-.28.03-.55.1-.82"
                }
              )
            }
          ) : /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-5 w-5 text-gray-600",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 12c0 1.38.4 2.76 1.35 4.56m0 0A12.04 12.04 0 0112 20c3.73 0 7.12-1.28 9.65-3.44C22.6 14.76 23 13.38 23 12c0-1.38-.4-2.76-1.35-4.56A12.03 12.03 0 0012 4c-2.67 0-5.1.88-7.15 2.36M8.65 12c0 .28.03.55.1.82M17.25 7.5c.36.37.68.78 1 1.25M3.88 5.44c.73-.48 1.62-.92 2.5-1.3M15.75 12c0-.5.03-.99.1-1.47M7 12c0 1.5.5 2.94 1.35 4.25M3 12c0-1.38.4-2.76 1.35-4.56C6.16 5.12 9.58 4 12 4c3.73 0 7.12 1.28 9.65 3.44C22.6 9.24 23 10.62 23 12c0 1.38-.4 2.76-1.35 4.56C19.12 18.72 15.73 20 12 20a12.029 12.029 0 01-8.15-3.36C4.4 15.76 3 14.38 3 12z"
                }
              )
            }
          )
        }
      )
    ] })
  ] });
};
const getMenu = async () => {
  try {
    const response = await axios.get(
      "api/v1/menus",
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("_token")}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const createMenu = async (body) => {
  try {
    const response = await axios.post(
      "api/v1/menus",
      body,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("_token")}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
const updateMenu = async (body) => {
  try {
    const response = await axios.put(
      "api/v1/menus/" + body.id,
      body,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("_token")}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
const deleteMenu = async (id) => {
  try {
    const response = await axios.delete(
      "api/v1/menus/" + id,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("_token")}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
const MenuRepo = {
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu
};
const Select = ({
  label,
  options,
  variant = "primary",
  value,
  onChange,
  name,
  required = false
}) => {
  const variantClasses = {
    primary: "border-blue-500 focus:ring-blue-500",
    secondary: "border-gray-300 focus:ring-gray-500",
    success: "border-green-500 focus:ring-green-500",
    danger: "border-red-500 focus:ring-red-500"
  };
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold mb-1 text-gray-700 capitalize", children: label }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        name,
        className: `block w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${variantClasses[variant]}`,
        value,
        onChange,
        required,
        children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select an option" }),
          " ",
          options.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
        ]
      }
    )
  ] });
};
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);
const deleteItemByTitle = (data, targetTitle) => {
  return data.map((item) => {
    if (item.children) {
      item.children = deleteItemByTitle(item.children, targetTitle);
    }
    return item;
  }).filter((item) => item.id !== targetTitle);
};
const LayoutFolderPrimary = ({ data, isLoading, refresh }) => {
  useState(false);
  const [valueItem, setValueItem] = useState("");
  const [saveParentId, setSaveParentId] = useState("");
  const [saveParentData, setSaveParentData] = useState();
  const [conDrag, setConDrag] = useState(false);
  const [buttonExpand, setButtonExpand] = useState(true);
  const refDrag = useRef(null);
  useRef(null);
  const [editData, setEditData] = useState({
    edit: false,
    prevVal: ""
  });
  const [treeData, setTreeData] = useState(data);
  const canDrag = (param) => {
    return param.path.length > 0;
  };
  useEffect(() => {
    setTreeData(data);
  }, [data]);
  const handleAdd = async (node, path) => {
    setSaveParentId(node.id);
    setSaveParentData(node);
    setEditData({ edit: false, prevVal: "" });
    const newChild = {
      id: generateUniqueId,
      title: "",
      depth: getDepth(node),
      children: []
    };
    if (!node.children) {
      node.children.push(newChild);
    } else {
      node.children.push(newChild);
    }
    const updatedTreeData = toggleExpandedForAll({
      treeData,
      expanded: true
    });
    setTreeData(updatedTreeData);
  };
  const handleButtonExpand = (expand) => {
    setButtonExpand(!buttonExpand);
    const updateDataTree = toggleExpandedForAll({
      treeData,
      expanded: expand
    });
    setTreeData(updateDataTree);
  };
  const handleAddItem = (node) => {
    node.title = valueItem;
    const updatedTreeData = toggleExpandedForAll({
      treeData,
      expanded: true
    });
    let order = 1;
    if (saveParentData.children !== void 0) {
      order = saveParentData.children.length;
    }
    if (editData.edit) {
      const updateNewData = {
        id: node.id,
        title: valueItem,
        depth: node.depth,
        parent_id: node.parent_id
      };
      updateMenu2.mutate(updateNewData);
    } else {
      const updateNewData = {
        title: valueItem,
        depth: order,
        parent_id: saveParentId
      };
      createMenu2.mutate(updateNewData);
    }
    setTreeData(updatedTreeData);
  };
  const createMenu2 = useMutation({
    mutationFn: MenuRepo.createMenu,
    onSuccess: () => {
    },
    onError: (error) => {
    }
  });
  const deleteMenu2 = useMutation({
    mutationFn: MenuRepo.deleteMenu,
    onSuccess: () => {
      refresh();
    },
    onError: (error) => {
    }
  });
  const updateMenu2 = useMutation({
    mutationFn: MenuRepo.updateMenu,
    onSuccess: () => {
    },
    onError: (error) => {
    }
  });
  const handleEditData = (node) => {
    setSaveParentId(node.id);
    setEditData({ ...editData, edit: true, prevVal: node.title });
    node.title = "";
    const updatedTreeData = toggleExpandedForAll({
      treeData,
      expanded: true
    });
    setTreeData(updatedTreeData);
  };
  const handleDelete = (node) => {
    const updateData = deleteItemByTitle(treeData, node.id);
    deleteMenu2.mutate(node.id);
    setTreeData(updateData);
  };
  const handleCancel = (node) => {
    if (editData.edit) {
      node.title = editData.prevVal;
      const updatedTreeData = toggleExpandedForAll({
        treeData,
        expanded: true
      });
      setTreeData(updatedTreeData);
    } else {
      const updateData = deleteItemByTitle(treeData, node.id);
      setTreeData(updateData);
    }
  };
  const getDataDrop = (param) => {
    refDrag.current = param;
  };
  useEffect(() => {
    if (conDrag) {
      if (refDrag.current.nextParent !== void 0) {
        const filterDeepth = refDrag.current.nextParent.children.find(
          (item) => item.depth == refDrag.current.nextTreeIndex
        );
        const updateData2 = {
          ...filterDeepth,
          depth: refDrag.current.prevTreeIndex
        };
        updateMenu2.mutate(updateData2);
      }
      const updateData = {
        id: refDrag.current.node.id,
        title: refDrag.current.node.title,
        depth: refDrag.current.nextTreeIndex,
        parent_id: refDrag.current.nextParent ? refDrag.current.nextParent.id : ""
      };
      updateMenu2.mutate(updateData);
      setConDrag(false);
    }
  }, [conDrag]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "w-[50%]", children: /* @__PURE__ */ jsx(
      Select,
      {
        variant: "secondary",
        name: "menu",
        options: [
          {
            label: "System Management",
            value: "System Management"
          }
        ],
        label: "Menu"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex mt-[48px]", children: [
      /* @__PURE__ */ jsx("div", { className: "w-[133px] mr-[8px]", children: /* @__PURE__ */ jsx(
        ButtonRound,
        {
          onClick: () => handleButtonExpand(true),
          type: buttonExpand ? "light" : "secondary",
          children: "Expand All"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-[133px]", children: /* @__PURE__ */ jsx(
        ButtonRound,
        {
          onClick: () => handleButtonExpand(false),
          type: !buttonExpand ? "light" : "secondary",
          children: "Collapse All"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10", style: { height: "100vh" }, children: /* @__PURE__ */ jsx(
      SortableTree,
      {
        className: "node-main",
        treeData,
        canDrop: (param) => {
          getDataDrop(param);
          return true;
        },
        onDragStateChanged: (param) => {
          setConDrag(!param.isDragging);
        },
        onChange: (newTreeData) => setTreeData(newTreeData),
        canDrag: (param) => canDrag(param),
        generateNodeProps: ({ node, path }) => ({
          title: /* @__PURE__ */ jsx("div", { className: "custom-node", children: node.title == "" ? /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex",
              style: {
                zIndex: 500,
                position: "absolute"
              },
              children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "text",
                    name: "title",
                    onChange: (val) => setValueItem(val.target.value)
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx(
                  ButtonRound,
                  {
                    onClick: () => handleAddItem(node),
                    type: "info",
                    children: "+"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx(
                  ButtonRound,
                  {
                    onClick: () => handleCancel(node),
                    type: "danger",
                    children: /* @__PURE__ */ jsx(
                      Icon,
                      {
                        icon: "material-symbols:cancel",
                        width: 24,
                        height: 24
                      }
                    )
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: node.title }),
            /* @__PURE__ */ jsx("div", { className: "button-plus", children: /* @__PURE__ */ jsx(
              ButtonRound,
              {
                onClick: () => handleAdd(node),
                type: "info",
                children: "+"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "button-plus", children: /* @__PURE__ */ jsx(
              ButtonRound,
              {
                onClick: () => handleEditData(node),
                type: "secondary",
                children: /* @__PURE__ */ jsx(
                  Icon,
                  {
                    icon: "ic:baseline-edit",
                    width: 14,
                    height: 14
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "button-plus", children: /* @__PURE__ */ jsx(
              ButtonRound,
              {
                onClick: () => handleDelete(node),
                type: "danger",
                children: /* @__PURE__ */ jsx(
                  Icon,
                  {
                    icon: "material-symbols:delete",
                    width: 14,
                    height: 14
                  }
                )
              }
            ) })
          ] }) })
        })
      }
    ) })
  ] });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LayoutFolderPrimary
}, Symbol.toStringTag, { value: "Module" }));
const BodySystem = ({
  data,
  isLoading,
  refresh
}) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "mt-10", children: !isLoading && data !== void 0 && /* @__PURE__ */ jsx(
    LayoutFolderPrimary,
    {
      refresh,
      isLoading,
      data: data == null ? void 0 : data.data
    }
  ) }) });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BodySystem
}, Symbol.toStringTag, { value: "Module" }));
const LayoutFolder = () => {
  const graphRef = useRef(null);
  const graphOptions = {
    debug: false,
    layout: {
      layoutName: "folder",
      from: "left",
      min_per_width: 50,
      min_per_height: 40,
      centerOffset_x: 80,
      centerOffset_y: -100
    },
    defaultNodeShape: 1,
    defaultNodeWidth: 100,
    defaultLineShape: 41,
    allowShowMiniToolBar: false,
    defaultPolyLineRadius: 4,
    defaultExpandHolderPosition: "right",
    defaultBottomJuctionPoint_X: 28,
    defaultJunctionPoint: "lr",
    defaultNodeBorderWidth: 0,
    defaultLineColor: "rgba(0, 186, 189, 1)",
    defaultNodeColor: "rgba(0, 186, 189, 1)",
    reLayoutWhenExpandedOrCollapsed: true,
    canvasZoom: 190,
    minCanvasZoom: 190,
    disableZoom: true,
    isMoveByParentNode: false,
    disableDragCanvas: true,
    disableDragNode: false,
    zoomToFitWhenRefresh: true
  };
  const setGraphData = async () => {
    const rootNodeJson = [
      {
        fontColor: "black",
        id: "a",
        text: "Systems",
        children: [
          {
            fontColor: "black",
            id: "b",
            text: "Menu Item",
            children: [
              {
                fontColor: "black",
                id: "b1",
                text: "b1",
                children: [
                  {
                    id: "b1-1",
                    fontColor: "black",
                    text: "Menu"
                  }
                ]
              },
              {
                id: "b2",
                text: "b2",
                children: [
                  { id: "b2-1", text: "b2-1" },
                  { id: "b2-2", text: "b2-2" }
                ]
              }
            ]
          },
          {
            id: "c",
            text: "c",
            children: [
              { id: "c1", text: "c1" },
              { id: "c2", text: "c2" },
              { id: "c3", text: "c3" }
            ]
          }
        ]
      }
    ];
    const graphInstance = graphRef.current.getInstance();
    const graphJsonData = {
      rootId: "a",
      nodes: [],
      lines: []
    };
    graphInstance == null ? void 0 : graphInstance.flatNodeData(
      rootNodeJson,
      null,
      graphJsonData.nodes,
      graphJsonData.lines
    );
    graphJsonData.lines.forEach((line) => {
      line.fromJunctionPoint = "bottom";
      line.toJunctionPoint = "left";
    });
    await graphInstance.addNodes(graphJsonData.nodes);
    await graphInstance.addLines(graphJsonData.lines);
    graphInstance.graphData.rootNode = graphInstance == null ? void 0 : graphInstance.getNodeById(
      graphJsonData.rootId
    );
    await (graphInstance == null ? void 0 : graphInstance.doLayout());
    await (graphInstance == null ? void 0 : graphInstance.playShowEffect());
  };
  useEffect(() => {
    setGraphData();
  }, []);
  return /* @__PURE__ */ jsx("div", { style: { height: "calc(100vh)", width: "100%" }, children: /* @__PURE__ */ jsx(RelationGraph, { ref: graphRef, options: graphOptions }) });
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LayoutFolder
}, Symbol.toStringTag, { value: "Module" }));
const Header = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(Icon, { color: "#D0D5DD", icon: "material-symbols:folder" }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
      " ",
      /* @__PURE__ */ jsx("p", { className: "text-custom-gray text-[14px]", children: "Menu" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-10", children: [
      /* @__PURE__ */ jsx("img", { src: "/icon/icon-title.svg " }),
      /* @__PURE__ */ jsx("h1", { className: "text-custom-black ml-3 text-[32px] font-bold", children: "Menu" })
    ] })
  ] });
};
const useGetMenu = () => {
  return useQuery({
    queryKey: ["menus"],
    // Key unik untuk query ini
    queryFn: MenuRepo.getMenu,
    // Fungsi untuk mengambil data
    staleTime: 1e3 * 60 * 5
    // Data disimpan selama 5 menit sebelum dianggap "stale"
  });
};
const MenuQuery = {
  useGetMenu
};
const Dashboard = () => {
  const { data, isLoading, refetch } = MenuQuery.useGetMenu();
  const [formName, setFormName] = useState("");
  const queryClient2 = useQueryClient();
  const createMenu2 = useMutation({
    mutationFn: MenuRepo.createMenu,
    onSuccess: (newItem) => {
      refetch();
      queryClient2.setQueryData(["menu"], (oldData) => ({
        ...oldData,
        items: [...oldData.items, newItem]
        // Asumsikan `newItem` adalah item yang baru dibuat
      }));
    },
    onError: (error) => {
    }
  });
  const handleAddName = () => {
    const body = {
      parent_id: "",
      title: formName,
      depth: 0
    };
    createMenu2.mutate(body);
  };
  return /* @__PURE__ */ jsxs("div", { className: "my-10 pl-[48px] w-full", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 mt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full", children: data && /* @__PURE__ */ jsx(
        BodySystem,
        {
          refresh: refetch,
          data,
          isLoading
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-full p-20", children: !isLoading && data && (data == null ? void 0 : data.data.length) === 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            onChange: (val) => setFormName(val.target.value),
            variant: "success",
            label: "Name",
            name: "name",
            placeholder: "Enter Menu name"
          }
        ),
        /* @__PURE__ */ jsx(ButtonRound, { onClick: handleAddName, type: "primary", children: "Save" })
      ] }) })
    ] })
  ] });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const Systems = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { style: { color: "black" }, children: "Hallo Systems" }) });
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Systems
}, Symbol.toStringTag, { value: "Module" }));
const Card = ({ children, imageUrl, title, footer }) => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-sm rounded overflow-hidden shadow-lg w-full p-5", children: [
    imageUrl ? /* @__PURE__ */ jsx(
      "img",
      {
        className: "w-full h-48 object-cover",
        src: imageUrl,
        alt: title
      }
    ) : /* @__PURE__ */ jsx("h5", { className: "text-2xl font-semibold text-gray-800 mb-4 text-center", children: title }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4", children }),
    footer !== void 0 && /* @__PURE__ */ jsx("div", { className: "px-6 pt-4 pb-2", children: footer })
  ] });
};
const Button = ({
  type = "primary",
  children,
  onClick,
  ...props
}) => {
  const buttonTypes = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white w-full",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white w-full",
    success: "bg-green-500 hover:bg-green-700 text-white w-full",
    danger: "bg-red-500 hover:bg-red-700 text-white w-full",
    warning: "bg-yellow-500 hover:bg-yellow-700 text-white w-full",
    info: "bg-teal-500 hover:bg-teal-700 text-white w-full",
    light: "bg-gray-200 hover:bg-gray-300 text-gray-800 w-full",
    dark: "bg-black hover:bg-gray-800 text-white w-full"
  };
  const buttonClass = `${buttonTypes[type]} font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;
  return /* @__PURE__ */ jsx("button", { className: buttonClass, onClick, ...props, children });
};
const authLogin$2 = async (email, password) => {
  try {
    const response = await axios.post(
      "api/v1/login",
      {
        email,
        password
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const authRepo = {
  authLogin: authLogin$2
};
const authLogin$1 = async (email, password) => {
  const response = await authRepo.authLogin(email, password);
  return response;
};
const authService = {
  authLogin: authLogin$1
};
var AuthActionTypes = /* @__PURE__ */ ((AuthActionTypes2) => {
  AuthActionTypes2["LOGIN"] = "LOGIN";
  return AuthActionTypes2;
})(AuthActionTypes || {});
const authLogin = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await authService.authLogin(email, password);
    if (response.status == "success") {
      dispatch({
        type: AuthActionTypes.LOGIN,
        user: response.data.user,
        token: response.data.token
      });
      navigate("/dashboard");
      window.location.reload();
    }
  } catch (error) {
    throw error;
  }
};
const AuthAction = {
  authLogin
};
const selector = (state) => state.auth;
const AuthUseCase = () => {
  const { user, isLogin } = useSelector(
    selector
  );
  const dispatch = useDispatch();
  const authLogin2 = useCallback(
    (email, password, navigate) => AuthAction.authLogin(email, password, navigate)(dispatch),
    [dispatch]
  );
  return {
    isLogin,
    user,
    authLogin: authLogin2
  };
};
const LoginPage = () => {
  const { authLogin: authLogin2 } = AuthUseCase();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleSubmit = async () => {
    await authLogin2(form.email, form.password, navigate);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen bg-gray-100 w-full", children: /* @__PURE__ */ jsxs(Card, { title: "Login", imageUrl: "", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        name: "email",
        type: "email",
        variant: "secondary",
        placeholder: "Enter your email",
        label: "Email",
        onChange: (e) => handleChange(e)
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        name: "password",
        type: "password",
        variant: "secondary",
        placeholder: "Enter your password",
        label: "password",
        onChange: (e) => handleChange(e)
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "my-2", children: /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: "Login" }) })
  ] }) });
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoginPage
}, Symbol.toStringTag, { value: "Module" }));
const queryClient = new QueryClient();
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./pages/Welcome.tsx": __vite_glob_0_0, "./pages/dashboard/components/systems/BodySystem.tsx": __vite_glob_0_1, "./pages/dashboard/components/systems/LayoutFolder.tsx": __vite_glob_0_2, "./pages/dashboard/components/systems/LayoutFolderPrimary.tsx": __vite_glob_0_3, "./pages/dashboard/index.tsx": __vite_glob_0_4, "./pages/dashboard/systems/index.tsx": __vite_glob_0_5, "./pages/login/index.tsx": __vite_glob_0_6 });
      return pages[`./pages/${name}.tsx`];
    },
    setup: ({ App: App2, props }) => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(App2, { ...props }) })
  })
);
