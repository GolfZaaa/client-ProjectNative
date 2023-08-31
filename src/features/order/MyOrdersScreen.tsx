import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar, TabBarProps } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateOrderUser,
  GetOrderByUserId,
  GetOrderUser,
  UpdateOrderStatus,
  selectorder,
} from "./orderSlice";
import { selectuserid, selectusername } from "../account/accountSlice";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import agent from "../api/agent";
import { selectProducts } from "../product/productSlice";

const FirstRoute = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);
  const orders = useSelector(selectorder);
  const UrlImage = agent.UrlFolderOrderImage;

  useEffect(() => {
    dispatch(GetOrderByUserId({ userId }) as any);
  }, [dispatch]);

  // console.log("Order", orders);

  return (
    <View style={styles.scene}>
      <ScrollView>
        <View>
          <Image
            source={require("../../../assets/icons/image/ads2.jpg")}
            style={styles.image}
          />
        </View>
        {/* เส้นใหญ่  Start*/}
        <View style={{ width: 670, backgroundColor: "#f8f8f8", height: 8 }}>
          <Text style={{ color: "rgba(0, 0, 0, 0)" }}>wewe</Text>
        </View>
        {/* เส้นใหญ่  End*/}
        {orders.map((order: any) => (
          <View key={order.id} style={{ marginTop: 10 }}>
            {order.orderStatus === 1 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  Pending payment
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  Order completed
                </Text>
              </View>
            )}

            <View style={{ justifyContent: "flex-end" }}>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 12,
                  marginTop: 5,
                  marginRight: 10,
                }}
              >
                {new Date(order.orderDate).toLocaleString("TH", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            {order.orderItem &&
              order.orderItem.map((item: any, index: any, image: any) => (
                <View key={index}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      key={index}
                      source={{ uri: UrlImage + item.product.image }}
                      style={{
                        width: 100,
                        height: 100,
                        marginTop: 20,
                        resizeMode: "contain",
                        borderWidth: 0.3,
                        borderColor: "#a3a3a3",
                      }}
                    />
                    <View style={{ paddingTop: 25, paddingLeft: 20 }}>
                      <Text style={{ fontSize: 15, fontWeight: "400" }}>
                        {item.product.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          color: "gray",
                        }}
                      >
                        {item.product.type}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "400",
                          color: "gray",
                        }}
                      >
                        {item.product.description}
                      </Text>

                      <View
                        style={{
                          paddingTop: 60,
                          flexDirection: "row",
                          right: 5,
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>
                          ${item.product.price}.00
                        </Text>
                        <Text
                          style={{
                            paddingLeft: 140,
                            fontSize: 18,
                            fontWeight: "300",
                          }}
                        >
                          x{item.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            {order.orderItem && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                  justifyContent: "flex-end",
                  paddingRight: 5,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "300" }}>
                  {order.orderItem.length} items :
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginRight: 5,
                    paddingLeft: 4,
                  }}
                >
                  ${order.totalAmount}.00
                </Text>
              </View>
            )}

            {/* เส้นเล็ก Start */}
            <View
              style={{
                borderWidth: 0.2,
                borderColor: "#dadada",
                width: 345,
                marginTop: 30,
              }}
            ></View>
            {/* เส้นเล็ก End */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const SecondRoute = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const username = useSelector(selectusername);
  const userId = useSelector(selectuserid);
  const orders = useSelector(selectorder);
  const [showModal, setShowModal] = useState(false);

  const UrlImage = agent.UrlFolderOrderImage;

  //   console.log("orderItem", orders[0].id);
  const filteredOrders = orders.filter((order: any) => order.orderStatus === 1);
  useEffect(() => {
    dispatch(GetOrderByUserId({ userId }) as any);
  }, [showModal]);

  const CreateOrder = async (clientSecret: any, id: any) => {
    try {
      await handleConfirmPayment(clientSecret, id);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleConfirmPayment = async (clientSecret: any, id: any) => {
    try {
      const { paymentOption } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Admin",
        defaultBillingDetails: {
          name: "Test",
        },
      });

      const { error } = await presentPaymentSheet();

      if (error) {
        console.log("Payment confirmation failed:", error.message);
        // Handle the payment error here
      } else {
        // Payment is successful, update the order status as "success"

        console.log("Payment successful. Payment Method ID:", paymentOption);
        setShowModal(true);
        await dispatch(UpdateOrderStatus({ id }) as any);
      }
    } catch (e: any) {
      console.error("Payment confirmation failed:", e.message);
      // Handle the payment error here
    }
  };

  return (
    <View style={styles.scene}>
      <ScrollView>
        {filteredOrders.map((order: any) => (
          <TouchableOpacity
            key={order.id}
            onPress={() => CreateOrder(order.clientSecret, order.id)}
            style={{ marginTop: 10 }}
          >
            {order.orderStatus === 1 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  Pending payment
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  Order completed
                </Text>
              </View>
            )}

            <View style={{ justifyContent: "flex-end" }}>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 12,
                  marginTop: 5,
                  marginRight: 10,
                }}
              >
                {new Date(order.orderDate).toLocaleString("TH", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            {order.orderItem &&
              order.orderItem.map((item: any, index: any, image: any) => (
                <View key={index}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      key={index}
                      source={{ uri: UrlImage + item.product.image }}
                      style={{
                        width: 100,
                        height: 100,
                        marginTop: 20,
                        resizeMode: "contain",
                        borderWidth: 0.3,
                        borderColor: "#a3a3a3",
                      }}
                    />
                    <View style={{ paddingTop: 25, paddingLeft: 20 }}>
                      <Text style={{ fontSize: 15, fontWeight: "400" }}>
                        {item.product.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          color: "gray",
                        }}
                      >
                        {item.product.type}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "400",
                          color: "gray",
                        }}
                      >
                        {item.product.description}
                      </Text>

                      <View
                        style={{
                          paddingTop: 60,
                          flexDirection: "row",
                          right: 5,
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>
                          ${item.product.price}.00
                        </Text>
                        <Text
                          style={{
                            paddingLeft: 140,
                            fontSize: 18,
                            fontWeight: "300",
                          }}
                        >
                          x{item.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            {order.orderItem && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                  justifyContent: "flex-end",
                  paddingRight: 5,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "300" }}>
                  {order.orderItem.length} items :
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginRight: 5,
                    paddingLeft: 4,
                  }}
                >
                  ${order.totalAmount}.00
                </Text>
              </View>
            )}

            {/* เส้นเล็ก Start */}
            <View
              style={{
                borderWidth: 0.2,
                borderColor: "#dadada",
                width: 345,
                marginTop: 30,
              }}
            ></View>
            {/* เส้นเล็ก End */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Complete = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);
  const orders = useSelector(selectorder);
  const UrlImage = agent.UrlFolderOrderImage;
  const products = useSelector(selectProducts);

  console.log("products", products);
  // console.log("orderItemcomplete", orders[0].orderItem[0].reviewStatus);
  const filteredOrders = orders.filter((order: any) => order.orderStatus === 2);
  // console.log("orders", orders[0].orderItem[1].id);
  useEffect(() => {
    dispatch(GetOrderByUserId({ userId }) as any);
  }, [dispatch]);

  // console.log('orders',orders[0].orderItem[0].product.id)

  return (
    <View style={styles.scene}>
      <ScrollView>
        <View>
          <Image
            source={require("../../../assets/icons/image/ads3.jpg")}
            style={styles.image}
          />
        </View>
        {/* เส้นใหญ่  Start*/}
        <View style={{ width: 670, backgroundColor: "#f8f8f8", height: 8 }}>
          <Text style={{ color: "rgba(0, 0, 0, 0)" }}>wewe</Text>
        </View>
        {/* เส้นใหญ่  End*/}
        {filteredOrders.map((order: any) => (
          <View>
            <View key={order.id} style={{ marginTop: 10 }}>
              {order.orderStatus === 1 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Pending payment
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Order completed
                  </Text>
                </View>
              )}

              <View style={{ justifyContent: "flex-end" }}>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    marginTop: 5,
                    marginRight: 10,
                  }}
                >
                  {new Date(order.orderDate).toLocaleString("TH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              {/* <Text>Total Amount: {order.totalAmount}</Text>
              <Text>OrderStatus: {order.orderStatus}</Text>
              <Text>Orderid: {order.id}</Text>
              <Text>Order Items:</Text> */}

              {order.orderItem &&
                order.orderItem.map((item: any, index: any, image: any) => (
                  <View key={index} style={{}}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        key={index}
                        source={{ uri: UrlImage + item.product.image }}
                        style={{
                          width: 100,
                          height: 100,
                          marginTop: 20,
                          resizeMode: "contain",
                          borderWidth: 0.3,
                          borderColor: "#a3a3a3",
                        }}
                      />
                      <View style={{ paddingTop: 25, paddingLeft: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400" }}>
                          {item.product.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: "gray",
                          }}
                        >
                          {item.product.type}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "400",
                            color: "gray",
                          }}
                        >
                          {item.product.description}
                        </Text>

                        {item.reviewStatus === 0 ? (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("WriteReviewScreen", {
                                productId: item.product,
                                OrderId: item.id,
                              })
                            }
                            style={{
                              width: 100,
                              borderWidth: 2,
                              alignItems: "center",
                              padding: 4,
                              borderRadius: 8,
                              borderColor: "#fcacf8",
                              left: 120,
                              top: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: "500",
                                color: "#b844b2",
                              }}
                            >
                              Review
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{
                              width: 140,
                              borderWidth: 2,
                              alignItems: "center",
                              padding: 6,
                              borderRadius: 8,
                              borderColor: "#fcacf8",
                              left: 80,
                              top: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: "500",
                                color: "#b844b2",
                              }}
                            >
                              Reviewed
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>

                    {/* เส้นเล็ก Start */}
                    <View
                      style={{
                        borderWidth: 0.2,
                        borderColor: "#dadada",
                        width: 345,
                        marginTop: 30,
                      }}
                    ></View>
                    {/* เส้นเล็ก End */}

                    {/* <Text>Product Status: {item.reviewStatus}</Text>
                    <Text>OrderID: {item.id}</Text>
                    <Text>Product Id: {item.product.id}</Text>
                    <Text>Product Type: {item.product.type}</Text>
                    <Text>Product Price: {item.product.price}</Text>
                    <Text>Product Description: {item.product.description}</Text> */}
                  </View>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const renderScene = ({ route, jumpTo, navigation }: any) => {
  switch (route.key) {
    case "All":
      return <FirstRoute />;
    case "Unpaid":
      return <SecondRoute navigation={navigation} />;
    case "Complete":
      return <Complete navigation={navigation} />;
    default:
      return null;
  }
};

const MyOrdersScreen = ({ navigation }: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "All", title: "All" },
    { key: "Unpaid", title: "Unpaid" },
    { key: "Complete", title: "Complete Payment" },
  ]);

  return (
    <View
      style={{
        paddingLeft: 25,
        paddingTop: 15,
        paddingRight: 20,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            style={{ paddingLeft: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
            right: 15,
          }}
        >
          Your orders
        </Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={(props) => renderScene({ ...props, navigation })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={styles.tabView}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "#ffffff" }}
            indicatorStyle={{ backgroundColor: "black" }}
            renderLabel={({ route, focused }) => (
              <Text
                style={{
                  color:
                    focused && route.title === "To Review" ? "#c7c7c7" : "#000",
                }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  scene: {
    backgroundColor: "white",
    flex: 1,
  },
  tabView: {
    backgroundColor: "transparent",
    flex: 1,
    bottom: 30,
  },
  image: {
    width: 350,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
});
