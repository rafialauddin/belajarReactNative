import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFD",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  accountType: {
    fontSize: 12,
    color: "#777",
    marginLeft: 15,
  },
  themeToggle: {
    fontSize: 24,
  },
  greeting: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accountNo: {
    backgroundColor: "#19918F",
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountDetails: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: "#ffffff",
    padding: 8,
    marginLeft: 10,
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
    padding: 8,
  },
  balanceDisplay: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
  },
  balance: {
    fontSize: 24,
    fontWeight: "600",
  },
  toggleVisibility: {
    marginLeft: 10,
    width : 23,
    height : 23,
    opacity: 0.35,
  },
  actionButtons: {
    flexDirection: "column",
    marginLeft: 20,
    
  },
  actionButton: {
    backgroundColor: "#19918F",
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    color: "white",
    fontSize: 18,
  },
  transactionHistory: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginRight: 20,
    marginLeft: 20,
    height: 333,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionDetail: {
    flex: 1,
  },
  transactionName: {
    fontWeight: "bold",
  },
  transactionType: {
    fontSize: 12,
    color: "#777",
  },
  transactionAmount: {
    fontSize: 16,
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  transactionDate: {
    fontSize: 12,
    color: "#777",
  },
  goodMorning: {
    fontWeight: "bold",
    fontSize: 20,
  },
  loader: {

  },
  errorContainer: {

  },
  errorText: {

  },
  postContainer: {

  },
  postTitle: {
    
  }
});