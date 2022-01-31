import React, {
  useState,
  useEffect,
  useCallback,
  FC,
  CSSProperties,
} from "react"
import { useVersion, useDataProvider } from "react-admin"
import { useMediaQuery, Theme } from "@material-ui/core"
import { subDays } from "date-fns"

import Welcome from "./Welcome"
import MonthlyRevenue from "./MonthlyRevenue"
import NbNewOrders from "./NbNewOrders"
import PendingOrders from "./PendingOrders"
import OrderChart from "./OrderChart"
import { GuestOrder } from "../../types"

interface OrderStats {
  revenue: number
  nbNewOrders: number
  pendingOrders: GuestOrder[]
}

interface State {
  nbNewOrders?: number
  nbPendingReviews?: number
  pendingOrders?: GuestOrder[]
  recentOrders?: GuestOrder[]
  revenue?: string
}

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
}

const Spacer = () => <span style={{ width: "1em" }} />
const VerticalSpacer = () => <span style={{ height: "1em" }} />

const Dashboard: FC = () => {
  const [state, setState] = useState<State>({})
  const version = useVersion()
  const dataProvider = useDataProvider()
  const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  const fetchOrders = useCallback(async () => {
    const aMonthAgo = subDays(new Date(), 30)
    const { data: recentOrders } = await dataProvider.getList<GuestOrder>(
      "guest-order",
      {
        filter: { date_gte: aMonthAgo.toISOString() },
        sort: { field: "date", order: "DESC" },
        pagination: { page: 1, perPage: 50 },
      }
    )
    const aggregations = recentOrders
      .filter((order) => order.status !== "cancelled")
      .reduce(
        (stats: OrderStats, order) => {
          if (order.status !== "cancelled") {
            stats.revenue += order.totalCost
            stats.nbNewOrders++
          }
          if (order.status === "ordered") {
            stats.pendingOrders.push(order)
          }
          return stats
        },
        {
          revenue: 0,
          nbNewOrders: 0,
          pendingOrders: [],
        }
      )
    setState((_state) => ({
      ..._state,
      recentOrders,
      revenue: aggregations.revenue.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      nbNewOrders: aggregations.nbNewOrders,
      pendingOrders: aggregations.pendingOrders,
    }))
  }, [dataProvider])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders, version])

  const { nbNewOrders, pendingOrders, revenue, recentOrders } = state
  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <Welcome />
        <MonthlyRevenue value={revenue} />
        <VerticalSpacer />
        <NbNewOrders value={nbNewOrders} />
        <VerticalSpacer />
        <PendingOrders orders={pendingOrders} />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}>
        <Welcome />
      </div>
      <div style={styles.flex}>
        <MonthlyRevenue value={revenue} />
        <Spacer />
        <NbNewOrders value={nbNewOrders} />
      </div>
      <div style={styles.singleCol}>
        <OrderChart orders={recentOrders} />
      </div>
      <div style={styles.singleCol}>
        <PendingOrders orders={pendingOrders} />
      </div>
    </div>
  ) : (
    <>
      <Welcome />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <MonthlyRevenue value={revenue} />
            <Spacer />
            <NbNewOrders value={nbNewOrders} />
          </div>
          <div style={styles.singleCol}>
            <OrderChart orders={recentOrders} />
          </div>
          <div style={styles.singleCol}>
            <PendingOrders orders={pendingOrders} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
